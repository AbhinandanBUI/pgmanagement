import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { SpinnerComponent } from 'src/app/views/layout/spinner/spinner.component';

@Injectable({
  providedIn: 'root'
})
export class SpinnerOverlayService {
  private overlayRef: OverlayRef | undefined;
  spinnerOverlayPortal = new ComponentPortal(SpinnerComponent);
  constructor(private overlay: Overlay) {
  }

  public show(message = '') {
    // Returns an OverlayRef (which is a PortalHost)

    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create();
    }
    if (!this.overlayRef?.hasAttached())
      this.overlayRef?.attach(this.spinnerOverlayPortal);

    // Create ComponentPortal that can be attached to a PortalHost// Attach ComponentPortal to PortalHost
  }

  public hide() {
    // if (!!this.overlayRef) {
    this.overlayRef?.detach();
    // }
  }
}