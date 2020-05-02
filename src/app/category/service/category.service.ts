import { Injectable } from '@angular/core';
import {Category} from '../model/category.interface'
import {Course} from '../model/course.interface'
import {filter, find} from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  constructor() { }

  findCategories(){
    return sampleCategories;
  }

  findCoursesByCategory(id){
    return  filter(sampleCourses, 
    (o) =>  {
      if (o.category == id) return o;
    });
  }

}

export const sampleCategories: Category[] = [
    { id: 1, name: 'Physics Grade 7' },
    { id: 2, name: 'Web Devt' }
  ];

export const sampleCourses: Course[] = [
    { id: 11, category:1, name: 'Algebra',  },
    { id: 12, category:1, name: 'Math' },
    { id: 13, category:1, name: 'Physics' },
    { id: 14, category: 2, name: 'Html & CSS basics' }
];