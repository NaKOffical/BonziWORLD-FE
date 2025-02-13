import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;

/**
 *The Rectangle tool that makes rectangles
 *@author Ian Moreno
 *@version 1.0
 */
public class RectangleTool implements Tool {
    private String name;
    private double initX;
    private double initY;
    private Color color;
    public RectangleTool() {
        name = "RectangleTool";
        color = Color.BLACK;
    }
    /**
     * Tool method that is called when the mouse is pressed.
     * Sets up the initial location of the rectangle.
     *
     * @param e The mouseevent that fired this onPress.
     * @param g The current graphics context.
     */
    public void onPress(MouseEvent e, GraphicsContext g) {
        initX = e.getX();
        initY = e.getY();
    }

    /**
     *
     * Does nothing.
     *
     * @param e The mouseevent that fired this onDrag.
     * @param g The current graphics context.
     */
    public void onDrag(MouseEvent e, GraphicsContext g) {

    }

    /**
     * Tool method that is called when the mouse is released.
     * Creates the rectangle from the initial point to the last point.
     *
     * @param e The mouseevent that fired this onRelease.
     * @param g The current graphics context.
     */
    public void onRelease(MouseEvent e, GraphicsContext g) {
        g.setFill(color);
        double width = 0;
        double height = 0;
        double xPos = 0;
        double yPos = 0;
        if (initX < e.getX()) {
            xPos = initX;
            width = e.getX() - initX;
        } else {
            xPos = e.getX();
            width = initX - e.getX();
        }
        if (initY < e.getY()) {
            yPos = initY;
            height = e.getY() - initY;
        } else {
            yPos = e.getY();
            height = initY - e.getY();
        }


        g.fillRect(xPos, yPos, width, height);
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
