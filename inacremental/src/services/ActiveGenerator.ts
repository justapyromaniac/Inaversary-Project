import Generator from "./Generator";

//class for an active generator. Parts you need to interact with for it to make resources
class ActiveGenerator extends Generator {

    public handleClick(): void {
        Generator.increment()
    }
}

export default new ActiveGenerator();