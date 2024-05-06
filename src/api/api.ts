import { RegionalServiceModel } from "@apiVald/regionalServiceModel";

export class Api {
  readonly BaseUrl: string;
  readonly Environment: string;
  readonly Name: string;
  readonly RegionAbbreviation: string;
  readonly Region: RegionalServiceModel;

  constructor(
    regionalService: RegionalServiceModel,
    name: string,
  ) {
    this.Region = regionalService;
    this.RegionAbbreviation = regionalService.Abbreviation;
    this.Environment = regionalService.Environment;
    this.Name = name;
    this.BaseUrl = regionalService.ApiUrlLookup.get(name) ?? "url not resolved";
  }
}
