import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DoneJobPage } from './done-job.page';

describe('DoneJobPage', () => {
  let component: DoneJobPage;
  let fixture: ComponentFixture<DoneJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DoneJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
