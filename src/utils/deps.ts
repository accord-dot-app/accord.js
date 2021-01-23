export default class Deps {    
  private static deps: any[] = [];

  static build(...types: any) {
    for (const Type of types) {
      try { this.deps.push(new Type()); }
      catch {}
    }
  }

  public static get<T>(type: any): T {
    try {      
      const service = this.deps.find(t => t instanceof type);
      return service || this.add(new type());
    } catch { return null; }
  }

  public static add<T>(instance: T): T {
    this.deps.push(instance);
    return instance;
  }
}
