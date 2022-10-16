class Screencast {
  propertiesToRender = [];
  constructor(...properties) {
    for (const property of properties) {
      this[property] = property;
      this.propertiesToRender.push(property);
    }
  }

  render() {
    return this["border"];
  }
}

console.log(new Screencast("border", "margin").render());
