class MainScene
{
    start()
    {
        let world = GameObject.findByName("ARWorld");
        world.addBehavior(ARWorld);

        let cube = GameObject.findByName("Tree");
        cube.convertToFlatShadedMesh();

        GameEvent.triggerEvent("HomeMenu", true);
    }
}
