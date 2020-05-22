import { Component, OnInit } from '@angular/core';
import {CourseCategory} from '../../../../../pana-tutor-lib/model/course/category.interface'
import {CategoryService} from '../../service/category.service'

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {

  categories = [];
  selectedCat: CourseCategory;

  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(){
    this.categories = this.categoryService.findCategories();
  }

  onSelect(cat: CourseCategory): void {
    this.selectedCat = cat;
  }

}

