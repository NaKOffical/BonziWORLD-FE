import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;


/**
 *The Polymorph tool that creates polymorphic images. Yeah the class is called
 *PaintBrush but it really isn't what it does...
 *@author Ian Moreno
 *@version 1.0
 */
public class PaintBrushTool implements Tool {
    private String name;
    private Color color;
    public PaintBrushTool() {
        name = "Paint Brush";
        color = Color.BLACK;
    }
    /**
     * Tool method that is called when the mouse is pressed.
     * Sets the initial location.
     *
     * @param e The mouseevent that fired this onPress.
     * @param g The current graphics context.
     */
    public void onPress(MouseEvent e, GraphicsContext g) {
        g.setFill(color);
        g.beginPath();
    }

    /**
     * Tool method that is called when the mouse is dragged.
     * Sets up the lines that are to be drawn.
     *
     * @param e The mouseevent that fired this onDrag.
     * @param g The current graphics context.
     */
    public void onDrag(MouseEvent e, GraphicsContext g) {
        g.lineTo(e.getX(), e.getY());
    }

    /**
     * Tool method that is called when the mouse is released.
     * Fills and closes the path/draws the lines.
     *
     * @param e The mouseevent that fired this onRelease.
     * @param g The current graphics context.
     */
    public void onRelease(MouseEvent e, GraphicsContext g) {
        g.closePath();
        g.fill();
    }

    /**
     * The name of this tool.
     *
     * @return This tool's name.
     */
    public String getName() {
        return name;
    }
    /**
     *Sets the color for the current tool in use.
     *@param color The color object that the private variable will be set to.
     */
    public void setColor(Color color) {
        this.color = color;
    }
}
