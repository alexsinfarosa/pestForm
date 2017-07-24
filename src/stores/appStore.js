import { observable, action } from "mobx";

export default class appStore {
  constructor(fetch) {
    this.fetch = fetch;
  }

  @observable isLoading = false;

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

  @action setSpecies = d => (this.species = d);

  @action
  addSpecie = d => {
    const id = this.species.length;
    const specie = {
      id: id,
      formalName: "",
      informalName: "",
      hosts: "",
      stages: [
        {
          name: "",
          status: "",
          ddlo: 0,
          ddhi: 0,
          phenologicalMarkers: "",
          scouting: "",
          management: "",
          biologicalControl: ""
        }
      ]
    };
    this.species.push(specie);
  };
}
