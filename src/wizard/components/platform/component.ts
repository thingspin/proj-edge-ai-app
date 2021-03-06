import { Component, Inject, OnInit, ViewChild }   from '@angular/core';
import { getStyleUrls }  from '../../utils/app.style';
import { FormDataService }     from '../../services/formData/formData.service';
import { FormGroup, NgForm } from '@angular/forms';
import { Platform } from '../../services/formData/formData.model';

@Component ({
    selector:  'edge-ai-wizard-platform',
    template:  require(`./component.html`),
    styleUrls: getStyleUrls(),
})
export class PlatformComponent implements OnInit {
    title = 'Which platform will be used for?';
    data: Platform;
    options: String[] = [
        'TensorFlow',
        'Scikits',
        'SparkML',
        'DataRobot',
        'Mixed'
    ];

    @ViewChild('form') public form: NgForm;

    constructor(@Inject(FormDataService) private formDataService: FormDataService) {
    }

    ngOnInit() {
        this.data = this.formDataService.getPlatform();
        if (!this.data.framework) {
            this.data.framework = "TensorFlow";
        }
    }

    save(form: FormGroup) {
        if (!form.valid) {
            return;
        }

        this.formDataService.setPlatform(this.data);
    }
}
