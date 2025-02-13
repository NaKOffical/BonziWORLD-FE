import javafx.scene.canvas.GraphicsContext;
import javafx.scene.input.MouseEvent;

/**
 *The pencil tool that draws stuff
 *@author Ian Moreno
 *@version 1.0
 */
public class PencilTool implements Tool {
    private String name;
    private double preX;
    private double preY;
    public PencilTool() {
        name = "Pencil";
    }
    /**
     * Tool method that is called when the mouse is pressed.
     * Usually involves beginning drawing a line.
     *
     * @param e The mouseevent that fired this onPress.
     * @param g The current graphics context.
     */
    public void onPress(MouseEvent e, GraphicsContext g) {
        preX = e.getX();
        preY = e.getY();
        g.beginPath();
    }

    /**
     * Tool method that is called when the mouse is dragged.
     * Updates the line.
     *
     * @param e The mouseevent that fired this onDrag.
     * @param g The current graphics context.
     */
    public void onDrag(MouseEvent e, GraphicsContext g) {
        g.strokeLine(preX, preY, e.getX(), e.getY());
        preX = e.getX();
        preY = e.getY();
    }

    /**
     * Tool method that is called when the mouse is released.
     * Fills and closes the path.
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
}
