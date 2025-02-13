var React = require('react/addons');
var ReactWinJS = require('react-winjs');

// UNDONE: for development, just jam the content in here... :)
window.unicode = global_data;

function shorten(str) {
    var maxLen = 20;
    if (str.length > maxLen) {
        return str.substring(0, maxLen-3) + "...";
    }
    return str;
}

var App = React.createClass({
    charItemRenderer: ReactWinJS.reactRenderer(function (item) {
        return (
            <div className="container">
                <div className="letter" dangerouslySetInnerHTML={{__html: 
                    item.data.name === "<control>" ? " " : "&#x" + item.data.code.toString(16) + ";"
                }} />
                <div>{item.data.code.toString(16) + " - " + (
                    item.data.name === "<control>" ? item.data.altName + " (control)" : item.data.name
                )}</div>
            </div>
        );
    }),
    gridLayout: { type: WinJS.UI.GridLayout },
    handleChangeBlockIndex: function (eventObject) {
        var newBlockIndex = eventObject.currentTarget.value;
        if (newBlockIndex !== this.state.blockIndex) {
            this.setState({
                blockIndex: newBlockIndex,
                charList: new WinJS.Binding.List(CharMap.createBlock(newBlockIndex))
            });
        }
    },
    handleToggleSplitView: function () {
        var splitView = this.refs.splitView.winControl;
        splitView.paneHidden = !splitView.paneHidden;
    },
    handleSearchString: function (eventObject) {
        var newSearchString = eventObject.currentTarget.value;
        if (newSearchString !== this.state.searchString) {
            this.setState({ searchString: newSearchString });
        }
    },
    searchClicked: function () {
        this.setState({
            mode: "search"
        });
    },
    listClicked: function () {
        this.setState({
            mode: "default"
        });
    },
    getInitialState: function () {
        var initialBlockIndex = 4;
        return {
            mode: "default",
            searchString: "",
            blockIndex: initialBlockIndex,
            charList: new WinJS.Binding.List(CharMap.createBlock(initialBlockIndex))
        };
    },
    renderDefault: function () {
        return  (
            <div className="contenttext">
                <div id="header">
                    <h1 id="title">CharMap React</h1>
                </div>

                <ReactWinJS.ListView
                    id="content"
                    className="content"
                    style={{paddingTop: "30px"}}
                    itemDataSource={this.state.charList.dataSource}
                    itemTemplate={this.charItemRenderer}
                    selectionMode="none"
                    tapBehavior="none"
                    layout={this.gridLayout} />
            </div>
        );
    },
    renderSearch: function() {
        var that = this;

        function matchChars(chars, str) { 
            return chars.filter(function(c) { 
                return c.name.toLowerCase().indexOf(str.toLowerCase()) != -1; 
            })
        };

        var all = CharMap.getAllBlocks();
        var onlyItemsWithMatches = all.filter(function (item) { 
            return matchChars(item.chars, that.state.searchString).length > 0; 
        });

        var blocks = onlyItemsWithMatches.
                map(function (item) {
                    return <ReactWinJS.Hub.Section key={item.block.name} header={item.block.name} isHeaderStatic={true}>
                        <div className="hubSectionLetterContainer">{
                            matchChars(item.chars, that.state.searchString).
                                filter(function (c, index) { return index < 40; }). // limit to first 40 results (for now)
                                map(function (c) {
                                    return <div className="item">
                                        <span className="letter" dangerouslySetInnerHTML={{__html: "&#x" + c.code.toString(16) + ";"}} /> 
                                        - {shorten(c.name)}
                                    </div>;
                                })
                        }</div>
                    </ReactWinJS.Hub.Section>;
                });

        return  (
            <div className="contenttext">
                <div id="header">
                    <h1 id="title">CharMap React</h1>
                    
                    <input
                        type="text"
                        value={this.state.searchString}
                        onChange={this.handleSearchString}
                        style={{width:400}} />
                </div>
                <ReactWinJS.Hub className='simpleList' orientation="vertical">
                    {blocks}
                </ReactWinJS.Hub>
            </div>
        );
    },
    render: function() {
        var paneComponent = (
            <div>
                <div className="header">
                    <button type="button" className="win-splitview-button" onClick={this.handleToggleSplitView}></button>
                    <div className="title">CharMap</div>
                </div>

                <div className="nav-commands">
                    <ReactWinJS.NavBarCommand onClick={CharMap.homeClicked} key="home" label="Home" icon="home" />
                    <ReactWinJS.NavBarCommand onClick={this.listClicked} key="list" label="List" icon="list" />
                    <ReactWinJS.NavBarCommand onClick={this.searchClicked} key="search" label="Search" icon="find" />
                </div>
            </div>
        );

        var contentComponent = this.state.mode === "search" ? this.renderSearch() : this.renderDefault();

        return <ReactWinJS.SplitView
            ref="splitView"
            paneComponent={paneComponent}
            contentComponent={contentComponent} />
    }
});

React.render(<App />, document.getElementById("app"));