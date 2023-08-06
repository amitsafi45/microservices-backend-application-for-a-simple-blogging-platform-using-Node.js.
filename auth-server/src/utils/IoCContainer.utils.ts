// A registry to store the dependencies
const dependencyRegistry: { [key: string]: any } = {};

// Decorator to mark classes as injectable
export function Injectable(): ClassDecorator {
  return (target: any) => {
    // Use the class name as the key in the registry
    dependencyRegistry[target.name] = target;
  };
}

// Decorator to define dependencies for a class constructor
export function Inject(dependencyName: string):any {
  return (target: any, propertyKey: string | symbol, parameterIndex: number) => {
    const className = target.constructor.name;
    const dependency = dependencyRegistry[dependencyName];
    if (!dependency) {
      throw new Error(`Dependency not found: ${dependencyName}`);
    }
    // Update the constructor to set the dependency at the correct parameter index
    target[className].prototype[propertyKey][parameterIndex] = new dependency();
  };
}
