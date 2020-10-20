import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindJobPage } from './find-job.page';

describe('FindJobPage', () => {
  let component: FindJobPage;
  let fixture: ComponentFixture<FindJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
