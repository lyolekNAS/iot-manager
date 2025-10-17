import { Component, Input, Output, EventEmitter, signal} from '@angular/core';
import { NgIf, NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortChartComponent } from '@devices/port-chart.component';
import { DeviceControllerService } from '@core/api/api/deviceController.service';
import { LoadingStatusEvent } from '@core/model/loadingStatusEvent';
import { PortView } from '@core/api/model/portView';

@Component({
  selector: 'app-port',
  standalone: true,
  templateUrl: './port.component.html',
  imports: [NgIf, NgClass, FormsModule, PortChartComponent]
})
export class PortComponent {

  @Input() port!: PortView;
  @Output() loadingStatus = new EventEmitter<LoadingStatusEvent>();

  isLoading = signal<boolean>(false);

  isChartVisible : boolean = false;


  constructor(
    private deviceService: DeviceControllerService
  ) {}

  updatePort(port: PortView) {
    this.updateStatuses(`Завантаження`, 'load');


    this.deviceService.updatePort(port.id!, port.value!).subscribe({
      next: () => {
        this.updateStatuses('', '');
      },
      error: (err) => {
        this.updateStatuses(`Не вдалось оновити порт: ${err.message} [${err.status}]`, 'err');
      },
    });
  }

  toggleChartVisibility() {
    this.isChartVisible = !this.isChartVisible;
  }

  updateStatuses(msg : string, type : string){
    this.isLoading.set(type === 'load');
    this.loadingStatus.emit({ msg: msg, type: type});
  }
}
