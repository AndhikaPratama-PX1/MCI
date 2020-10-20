import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListCandidatePage } from './list-candidate.page';

describe('ListCandidatePage', () => {
  let component: ListCandidatePage;
  let fixture: ComponentFixture<ListCandidatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListCandidatePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListCandidatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
