import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListJobPage } from './list-job.page';

describe('ListJobPage', () => {
  let component: ListJobPage;
  let fixture: ComponentFixture<ListJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
