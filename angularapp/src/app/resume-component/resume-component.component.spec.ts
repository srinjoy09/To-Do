import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumeComponentComponent } from './resume-component.component';

describe('ResumeComponentComponent', () => {
  let component: ResumeComponentComponent;
  let fixture: ComponentFixture<ResumeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumeComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResumeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
