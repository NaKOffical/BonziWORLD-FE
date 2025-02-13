import javafx.application.Application;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.stage.Stage;
import javafx.scene.layout.HBox;
import javafx.scene.layout.VBox;
import javafx.scene.canvas.Canvas;
import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;

/**
 *The Application that creates FXPaint.
 *@author Ian Moreno
 *@version 1.0
 */
public class PaintFX extends Application {
    private static Tool tool;
    private static Canvas canvas;
    /**
     *This method sets up the buttons, layout, and canvas for FXPaint.
     *@param stage The stage object that JavaFX passes in when start() is called
     */
    public void start(Stage stage) {
        //Initializes the tool to be a PencilTool
        setTool(new PencilTool());

        //Sets up all of the buttons
        Button pencilButton = new Button("Pencil");
        pencilButton.setOnAction(event -> {
                setTool(new PencilTool());
            });
        Button rectangleButton = new Button("Rectangle");
        rectangleButton.setOnAction(event -> {
                setTool(new RectangleTool());
            });
        Button eraserButton = new Button("Eraser");
        eraserButton.setOnAction(event -> {
                setTool(new EraserTool());
            });
        Button paintButton = new Button("Polymorph");
        paintButton.setOnAction(event -> {
                setTool(new PaintBrushTool());
            });
        Button clear = new Button("Clear");

        //Sets up Buttons to change the color of Rectangles and PaintBrushes

        Button blackButton = new Button("Set Black");
        blackButton.setOnAction(event -> {
                if (tool instanceof RectangleTool) {
                    ((RectangleTool) tool).setColor(Color.BLACK);
                }
                if (tool instanceof PaintBrushTool) {
                    ((PaintBrushTool) tool).setColor(Color.BLACK);
                }
            });
        Button redButton = new Button("Set Red");
        redButton.setOnAction(event -> {
                if (tool instanceof RectangleTool) {
                    ((RectangleTool) tool).setColor(Color.RED);
                }
                if (tool instanceof PaintBrushTool) {
                    ((PaintBrushTool) tool).setColor(Color.RED);
                }
            });
        Button blueButton = new Button("Set Blue");
        blueButton.setOnAction(event -> {
                if (tool instanceof RectangleTool) {
                    ((RectangleTool) tool).setColor(Color.BLUE);
                }
                if (tool instanceof PaintBrushTool) {
                    ((PaintBrushTool) tool).setColor(Color.BLUE);
                }
            });
        Button greenButton = new Button("Set Green");
        greenButton.setOnAction(event -> {
                if (tool instanceof RectangleTool) {
                    ((RectangleTool) tool).setColor(Color.GREEN);
                }
                if (tool instanceof PaintBrushTool) {
                    ((PaintBrushTool) tool).setColor(Color.GREEN);
                }
            });
        //Sets up the virticle box to put the buttons in
        VBox buttonList = new VBox(10, pencilButton, rectangleButton,
            eraserButton, paintButton, clear, blackButton, redButton,
            blueButton, greenButton);

        //Sets up the canvas
        canvas = new Canvas(750, 500);

        //Sets up the Horizontal box to hold the buttons and canvas
        HBox hbox = new HBox(buttonList, canvas);


        //Sets up the graphics context and makes the background white
        GraphicsContext graphics = canvas.getGraphicsContext2D();
        graphics.setFill(Color.WHITE);
        graphics.fillRect(0, 0, 750, 500);


        //Sets up the clear button
        clear.setOnAction(event -> {
                graphics.setFill(Color.WHITE);
                graphics.fillRect(0, 0, 750, 500);
            });

        //Sets up all of the MouseEvents and how the opperate with tools
        canvas.addEventHandler(MouseEvent.MOUSE_PRESSED,
                (event) -> {
                tool.onPress(event, graphics);
            });
        canvas.addEventHandler(MouseEvent.MOUSE_DRAGGED,
                (event) -> {
                tool.onDrag(event, graphics);
            });
        canvas.addEventHandler(MouseEvent.MOUSE_RELEASED,
                (event) -> {
                tool.onRelease(event, graphics);
            });


        //Sets up the scene and shows the stage
        Scene scene = new Scene(hbox);
        stage.setScene(scene);
        stage.setTitle("FXPaint");
        stage.show();
    }
    /**
     *Helper method that assists buttons and their lambda expressions.
     *@param newTool the tool that is being switched to
     */
    public static void setTool(Tool newTool) {
        tool = newTool;
    }
}
