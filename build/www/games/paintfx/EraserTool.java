import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.MouseEvent;
import javafx.scene.paint.Color;

/**
 *The Eraser tool that erases stuff
 *@author Ian Moreno
 *@version 1.0
 */
public class EraserTool implements Tool {
    private String name;
    public EraserTool() {
        name = "Eraser";
    }
    /**
     * Tool method that is called when the mouse is pressed.
     * Starts erasing stuff
     *
     * @param e The mouseevent that fired this onPress.
     * @param g The current graphics context.
     */
    public void onPress(MouseEvent e, GraphicsContext g) {
        g.setFill(Color.WHITE);
        g.fillOval(e.getX() - 6, e.getY() - 6, 12, 12);
    }

    /**
     * Tool method that is called when the mouse is dragged.
     * Updates the eraser's location and erases that location.
     *
     * @param e The mouseevent that fired this onDrag.
     * @param g The current graphics context.
     */
    public void onDrag(MouseEvent e, GraphicsContext g) {
        g.fillOval(e.getX() - 6, e.getY() - 6, 12, 12);
    }

    /**
     * Tool method that is called when the mouse is released.
     * Fills and closes the path.
     *
     * @param e The mouseevent that fired this onRelease.
     * @param g The current graphics context.
     */
    public void onRelease(MouseEvent e, GraphicsContext g) {

    }

    /**
     * The name of this tool.
     *
     * @return This tool's name.
     */
    public String getName() {
        return name;
    }
}
