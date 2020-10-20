import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { NeedloginaccountPage } from './needloginaccount.page';

describe('NeedloginaccountPage', () => {
  let component: NeedloginaccountPage;
  let fixture: ComponentFixture<NeedloginaccountPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedloginaccountPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(NeedloginaccountPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
