import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomehomePage } from './homehome.page';

describe('HomehomePage', () => {
  let component: HomehomePage;
  let fixture: ComponentFixture<HomehomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomehomePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HomehomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
