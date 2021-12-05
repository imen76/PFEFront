import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { StepModel } from '../../models/step.model';
import { StepsService } from '../../services/steps.service';

@Component({
  selector: 'app-step-template',
  templateUrl: './step-template.component.html',
  styleUrls: ['./step-template.component.scss']
})
export class StepTemplateComponent implements OnInit {
  @Input() step: StepModel;

  steps: Observable<StepModel[]>;
  currentStep: Observable<StepModel>;
  constructor(private stepsService: StepsService) {
    
   }
  ngOnInit(): void {

   
    this.steps = this.stepsService.getSteps();
   this.currentStep = this.stepsService.getCurrentStep();

 }
 onStepClick(step: StepModel) {
   this.stepsService.setCurrentStep(step);
 }
 onCompleteStep() {
   this.step.isComplete = true;
 }
}
