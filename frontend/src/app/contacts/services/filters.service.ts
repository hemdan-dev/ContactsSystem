import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
  private definedFilters = {
    name: {
      type: 'text',
      condetions: ['contains', 'equals'],
    },
    phone: {
      type: 'text',
      condetions: ['contains', 'equals'],
    },
    address: {
      type: 'text',
      condetions: ['contains', 'equals'],
    },
    notes: {
      type: 'text',
      condetions: ['contains', 'equals'],
    },
  };
  private filter: Record<any, any> = {};
  private selectedFilter;
  private selectedProperty;
  private selectedCondetion;

  constructor() {
    //set defaults
    const extractedFirstDefinedFilter = Object.entries(this.definedFilters)[0];
    this.selectedFilter = extractedFirstDefinedFilter[1];//get the first filter of the name
    this.selectedProperty = extractedFirstDefinedFilter[0];//get the first key "name"
    this.selectedCondetion = extractedFirstDefinedFilter[1].condetions[0];//get the first condetion of the name
  }

  addToFilter(value: string | number | Date) {
    let transforemedCondetion;
    if(this.selectedCondetion === "contains") {
      transforemedCondetion = { $regex: value, $options: 'i' };
    }else if(this.selectedCondetion === "equals"){
      transforemedCondetion = value;
    }else if(this.selectedCondetion === "greater than"){
      //
    }else{
      transforemedCondetion = value;
    }
    //check if the where isn't added in filter before
    if(!this.filter?.["$where"]) this.filter["$where"] = {};
    //add the new filter or replace the old one
    this.filter['$where'][this.selectedProperty] = transforemedCondetion;
    //return the new filter
    return this.filter;
  }

  removeFromWhereFilter(property: string) {
    if(!this.filter["$where"]) return;
    delete this.filter["$where"][property];
    return this.filter;
  }

  getWhereFilter() {
    if(!this.filter["$where"]) return {};
    return this.filter["$where"];
  }

  getDefinedFilters() {
    return this.definedFilters;
  }

  getSelectedFilter(){
    return this.selectedFilter;
  }

  setSelectedFilter(filter: string) {
    this.selectedFilter = (this.definedFilters as any)[filter];
  }

  getSelectedProperty(){
    return this.selectedProperty;
  }

  setSelectedProperty(property: string) {
    this.selectedProperty = property;
  }

  getSelectedCondetion(){
    return this.selectedCondetion;
  }

  setSelectedCondetion(condetion: string) {
    this.selectedCondetion = condetion;
  }
}