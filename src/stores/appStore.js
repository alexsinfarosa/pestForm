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
  addSpecie = row => {
    // const id = this.species.length;
    const specie = {
      id: row.id,
      formalName: row.formalName,
      informalName: row.informalName,
      hosts: row.hosts,
      expand: [
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

  @action
  deleteSpecie = row => {
    const data = [...this.species];
    const idx = data.findIndex(specie => specie.id === row[0]);
    data.splice(idx, 1);
    this.species = data;
  };
}
