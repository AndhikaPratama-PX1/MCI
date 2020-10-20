import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DetailJobPage } from './detail-job.page';

describe('DetailJobPage', () => {
  let component: DetailJobPage;
  let fixture: ComponentFixture<DetailJobPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailJobPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DetailJobPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
