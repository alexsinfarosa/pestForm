import { observable, action } from "mobx";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
  }

  @observable isLoading = false;
  @observable pestID = null;
  @action setPestID = d => (this.pestID = d);

  // Species ------------------------------------------------------------------
  @observable species = [];

  @action
  loadSpecies() {
    this.isLoading = true;
    this.fetch("species.json")
      .then(json => {
        this.updateSpecies(json);
        this.isLoading = false;
      })
      .catch(err => {
        console.log("Failed to load species", err);
      });
  }

  @action
  updateSpecies(json) {
    this.species.clear();
    json.forEach(specieJson => {
      this.species.push(specieJson);
    });
  }
}
