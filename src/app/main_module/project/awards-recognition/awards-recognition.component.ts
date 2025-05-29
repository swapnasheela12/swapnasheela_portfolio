import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-awards-recognition',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './awards-recognition.component.html',
  styleUrl: './awards-recognition.component.scss'
})
export class AwardsRecognitionComponent {
  awards = [
    {
      title: 'Best UI developer Recognition',
      issuer: 'Reliance Jio',
      year: '2020',
      image: '../../../../assets/image/awards/jio.png'
    },
    {
      title: 'Topcoder Challenge Winner',
      issuer: 'Wipro (Topcoder)',
      year: '2022',
      image: '../../../../assets/image/awards/topcoder.jpg'
    },

    {
      title: 'React Redux Certificate',
      issuer: 'SkillSoft',
      year: '2025',
      image: '../../../../assets/image/awards/react-redux.png'
    },
    {
      title: 'React Certificate',
      issuer: 'SkillSoft',
      year: '2025',
      image: '../../../../assets/image/awards/reactive application eith react.png'
    },
    {
      title: 'AWS Cloud Practitioner Certificate',
      issuer: 'EXL Services',
      year: '2025',
      image: '../../../../assets/image/awards/aws-cloud-practitioner.jpeg'
    }
  ];

}
