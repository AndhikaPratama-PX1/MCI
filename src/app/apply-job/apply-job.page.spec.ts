import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ApplyJobPage } from './apply-job.page';

describe('ApplyJobPage', () => {
  let component: ApplyJobPage;
  let fixture: ComponentFixture<ApplyJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApplyJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ApplyJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
