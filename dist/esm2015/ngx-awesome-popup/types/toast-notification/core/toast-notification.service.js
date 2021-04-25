import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { ToastNotificationWrapperComponent } from '../toast-notification-wrapper/toast-notification-wrapper.component';
import { ToastNotificationClass } from './model';
import { DialogInjector } from '../../../core/dialog-injector';
import { map } from 'rxjs/operators';
import { ToastNotificationConfigService } from './toast-notification-config.service';
import * as i0 from "@angular/core";
import * as i1 from "./toast-notification-config.service";
export class ToastNotificationService {
    constructor(componentFactoryResolver, injector, appRef, toastConfig) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.toastConfig = toastConfig;
        this.toastComponentRefList = [];
        this.bufferToastRawList = [];
        this.bufferCheckingIntervalIsReady = true;
    }
    openToast$(_ToastNotificationBelonging) {
        let eventController = _ToastNotificationBelonging.EventsController;
        // console.log(`%c ${_ToastNotificationBelonging.EntityUniqueID} `, `background: #339933; color: #fff`);
        const toastRawInstance = this.prepareRawToast(eventController, _ToastNotificationBelonging);
        this.listeners(eventController);
        this.internalRouting(toastRawInstance);
        return eventController.afterClosed$;
    }
    internalRouting(_ToastRawInstance) {
        if (this.isRefListAvailable()) {
            this.sendToProduction(_ToastRawInstance);
            return true;
        }
        else {
            this.sendToBuffer(_ToastRawInstance);
            return false;
        }
    }
    sendToBuffer(_ToastRawInstance) {
        this.bufferToastRawList.push(_ToastRawInstance);
    }
    sendToProduction(_ToastRawInstance) {
        const componentRef = this.getComponentRef(_ToastRawInstance);
        if (componentRef) {
            this.toastComponentRefList.push(componentRef);
            componentRef.instance.toastNotificationBelonging = _ToastRawInstance.ToastBelonging;
            this.appendToBodyParentComponent(componentRef);
        }
    }
    isRefListAvailable() {
        return this.toastComponentRefList.length < this.toastConfig.productionConfig.GlobalSettings.AllowedNotificationsAtOnce;
    }
    prepareRawToast(_EventsController, _ToastNotificationBelonging) {
        const weakMap = new WeakMap();
        weakMap.set(ToastNotificationClass.ToastNotificationEventsController, _EventsController);
        return {
            WeakMap: weakMap,
            ToastBelonging: _ToastNotificationBelonging
        };
    }
    getComponentRef(_ToastNotificationRawState) {
        const dialogIndex = this.findDialogIndex(_ToastNotificationRawState.ToastBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const componentFactory = this.componentFactoryResolver.resolveComponentFactory(ToastNotificationWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, _ToastNotificationRawState.WeakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            // this.removeFromBodyParentComponent(modalIndex);
            this.removeFromBody(response.toastNotificationBelonging.EntityUniqueID);
            closeDialogSubscription.unsubscribe();
        });
    }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView.rootNodes[0];
        const targetNode = document.getElementById('toast-wrapper');
        const toastEntity = document.createElement('div');
        toastEntity.setAttribute('id', _ComponentRef.instance.toastNotificationBelonging.EntityUniqueID);
        toastEntity.className = 'toast-entity';
        toastEntity.prepend(domElem);
        // targetNode.prepend(toastEntity);
        setTimeout(() => {
            targetNode.prepend(toastEntity);
        }, 200);
    }
    removeFromBody(_EntityUniqueID) {
        const modalIndex = this.findDialogIndex(_EntityUniqueID);
        if (modalIndex > -1) {
            if (this.bufferToastRawList.length) {
                this.sendToProduction(this.bufferToastRawList[0]);
                this.bufferToastRawList.splice(0, 1);
            }
            this.toastComponentRefList[modalIndex].instance.closeParent$('close-fast').pipe(map(item => {
                const modalIndex = this.findDialogIndex(_EntityUniqueID);
                if (this.toastComponentRefList[modalIndex]) {
                    const toastEntity = document.getElementById(this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID);
                    toastEntity.remove();
                    // console.log(`%c ${this.toastComponentRefList[modalIndex].instance.toastNotificationBelonging.EntityUniqueID} `, `background: #cc3333; color: #fff`);
                    this.appRef.detachView(this.toastComponentRefList[modalIndex].hostView);
                    this.toastComponentRefList[modalIndex].destroy();
                    this.toastComponentRefList.splice(modalIndex, 1);
                }
            })).subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.toastComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.toastNotificationBelonging.EntityUniqueID;
        });
    }
}
ToastNotificationService.ɵprov = i0.ɵɵdefineInjectable({ factory: function ToastNotificationService_Factory() { return new ToastNotificationService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef), i0.ɵɵinject(i1.ToastNotificationConfigService)); }, token: ToastNotificationService, providedIn: "root" });
ToastNotificationService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
ToastNotificationService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef },
    { type: ToastNotificationConfigService }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy90b2FzdC1ub3RpZmljYXRpb24vY29yZS90b2FzdC1ub3RpZmljYXRpb24uc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUMsY0FBYyxFQUFFLHdCQUF3QixFQUFpQyxVQUFVLEVBQUUsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVILE9BQU8sRUFBQyxpQ0FBaUMsRUFBQyxNQUFNLG9FQUFvRSxDQUFDO0FBQ3JILE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSxTQUFTLENBQUM7QUFDM0UsT0FBTyxFQUFDLGNBQWMsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUNuQyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQzs7O0FBTW5GLE1BQU0sT0FBTyx3QkFBd0I7SUFNakMsWUFBb0Isd0JBQWtELEVBQVUsUUFBa0IsRUFBVSxNQUFzQixFQUFVLFdBQTJDO1FBQW5LLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBZ0I7UUFBVSxnQkFBVyxHQUFYLFdBQVcsQ0FBZ0M7UUFKdkwsMEJBQXFCLEdBQXVFLEVBQUUsQ0FBQztRQUMvRix1QkFBa0IsR0FBMEUsRUFBRSxDQUFDO1FBQy9GLGtDQUE2QixHQUErRCxJQUFJLENBQUM7SUFHakcsQ0FBQztJQUVELFVBQVUsQ0FBQywyQkFBOEU7UUFDckYsSUFBSSxlQUFlLEdBQUcsMkJBQTJCLENBQUMsZ0JBQWdCLENBQUM7UUFDbkUsd0dBQXdHO1FBRXhHLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FBQyxlQUFlLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ2hDLElBQUksQ0FBQyxlQUFlLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN2QyxPQUFPLGVBQWUsQ0FBQyxZQUFZLENBQUM7SUFDeEMsQ0FBQztJQUVELGVBQWUsQ0FBQyxpQkFBd0U7UUFDcEYsSUFBSSxJQUFJLENBQUMsa0JBQWtCLEVBQUUsRUFBRTtZQUMzQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUN6QyxPQUFPLElBQUksQ0FBQztTQUNmO2FBQU07WUFDSCxJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLENBQUM7WUFDckMsT0FBTyxLQUFLLENBQUM7U0FDaEI7SUFDTCxDQUFDO0lBRUQsWUFBWSxDQUFDLGlCQUF3RTtRQUNqRixJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELGdCQUFnQixDQUFDLGlCQUF3RTtRQUNyRixNQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGlCQUFpQixDQUFDLENBQUM7UUFDN0QsSUFBSSxZQUFZLEVBQUU7WUFDZCxJQUFJLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQzlDLFlBQVksQ0FBQyxRQUFRLENBQUMsMEJBQTBCLEdBQUcsaUJBQWlCLENBQUMsY0FBYyxDQUFDO1lBQ3BGLElBQUksQ0FBQywyQkFBMkIsQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUVsRDtJQUNMLENBQUM7SUFFRCxrQkFBa0I7UUFDZCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsMEJBQTBCLENBQUM7SUFDM0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxpQkFBMkUsRUFBRSwyQkFBOEU7UUFFdkssTUFBTSxPQUFPLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztRQUM5QixPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLGlDQUFpQyxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFFekYsT0FBTztZQUNILE9BQU8sRUFBUyxPQUFPO1lBQ3ZCLGNBQWMsRUFBRSwyQkFBMkI7U0FDOUMsQ0FBQztJQUNOLENBQUM7SUFFRCxlQUFlLENBQUMsMEJBQWlGO1FBRTdGLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ25HLElBQUksV0FBVyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQ3BCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUFDLHVCQUF1QixDQUFDLGlDQUFpQyxDQUFDLENBQUM7WUFDbEgsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxjQUFjLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSwwQkFBMEIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1NBQ3pHO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDaEIsQ0FBQztJQUVELFNBQVMsQ0FBQyxpQkFBMkU7UUFFakYsOEJBQThCO1FBQzlCLE1BQU0sdUJBQXVCLEdBQUcsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBRWxGLGtEQUFrRDtZQUNsRCxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN4RSx1QkFBdUIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCwyQkFBMkIsQ0FBQyxhQUFnQztRQUN4RCx3Q0FBd0M7UUFDeEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQy9DLE1BQU07UUFDTixNQUFNLE9BQU8sR0FBb0IsYUFBYSxDQUFDLFFBQWlDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBZ0IsQ0FBQztRQUM3RyxNQUFNLFVBQVUsR0FBZ0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUN6RSxNQUFNLFdBQVcsR0FBZSxRQUFRLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQzlELFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLGFBQWEsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakcsV0FBVyxDQUFDLFNBQVMsR0FBRyxjQUFjLENBQUM7UUFDdkMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM3QixtQ0FBbUM7UUFDbkMsVUFBVSxDQUFDLEdBQUUsRUFBRTtZQUNYLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDcEMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBR1osQ0FBQztJQUVELGNBQWMsQ0FBQyxlQUF1QjtRQUVsQyxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ3pELElBQUksVUFBVSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBRWpCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLE1BQU0sRUFBRTtnQkFDaEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNsRCxJQUFJLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQzthQUV4QztZQUVELElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3ZGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQ3pELElBQUksSUFBSSxDQUFDLHFCQUFxQixDQUFDLFVBQVUsQ0FBQyxFQUFFO29CQUN4QyxNQUFNLFdBQVcsR0FBRyxRQUFRLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7b0JBQ3ZJLFdBQVcsQ0FBQyxNQUFNLEVBQUUsQ0FBQztvQkFDckIsdUpBQXVKO29CQUN2SixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsVUFBVSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7b0JBQ3hFLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQztvQkFDakQsSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQ3BEO1lBQ0wsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNuQjtJQUNMLENBQUM7SUFFRCxlQUFlLENBQUMsZUFBdUI7UUFDbkMsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakQsT0FBTyxlQUFlLEtBQUssSUFBSSxDQUFDLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUM7UUFDdkYsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDOzs7O1lBaklKLFVBQVUsU0FBQztnQkFDUixVQUFVLEVBQUUsTUFBTTthQUNyQjs7O1lBVnVCLHdCQUF3QjtZQUE2QyxRQUFRO1lBQTdGLGNBQWM7WUFLZCw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0FwcGxpY2F0aW9uUmVmLCBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIENvbXBvbmVudFJlZiwgRW1iZWRkZWRWaWV3UmVmLCBJbmplY3RhYmxlLCBJbmplY3Rvcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RvYXN0Tm90aWZpY2F0aW9uV3JhcHBlckNvbXBvbmVudH0gZnJvbSAnLi4vdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIvdG9hc3Qtbm90aWZpY2F0aW9uLXdyYXBwZXIuY29tcG9uZW50JztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25DbGFzcywgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2V9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtEaWFsb2dJbmplY3Rvcn0gZnJvbSAnLi4vLi4vLi4vY29yZS9kaWFsb2ctaW5qZWN0b3InO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25Db25maWdTZXJ2aWNlfSBmcm9tICcuL3RvYXN0LW5vdGlmaWNhdGlvbi1jb25maWcuc2VydmljZSc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gICAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIFRvYXN0Tm90aWZpY2F0aW9uU2VydmljZSB7XG4gICAgXG4gICAgdG9hc3RDb21wb25lbnRSZWZMaXN0OiBDb21wb25lbnRSZWY8VG9hc3ROb3RpZmljYXRpb25XcmFwcGVyQ29tcG9uZW50PltdICAgICAgICAgICAgICAgICAgPSBbXTtcbiAgICBidWZmZXJUb2FzdFJhd0xpc3Q6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlW10gICAgICAgICAgICAgICA9IFtdO1xuICAgIGJ1ZmZlckNoZWNraW5nSW50ZXJ2YWxJc1JlYWR5OiBib29sZWFuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsIHByaXZhdGUgaW5qZWN0b3I6IEluamVjdG9yLCBwcml2YXRlIGFwcFJlZjogQXBwbGljYXRpb25SZWYsIHByaXZhdGUgdG9hc3RDb25maWc6IFRvYXN0Tm90aWZpY2F0aW9uQ29uZmlnU2VydmljZSkge1xuICAgIH1cbiAgICBcbiAgICBvcGVuVG9hc3QkKF9Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZzogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyk6IE9ic2VydmFibGU8VG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVByaXZhdGVSZXNwb25zZU1lcmdlZD4ge1xuICAgICAgICBsZXQgZXZlbnRDb250cm9sbGVyID0gX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkV2ZW50c0NvbnRyb2xsZXI7XG4gICAgICAgIC8vIGNvbnNvbGUubG9nKGAlYyAke19Ub2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRH0gYCwgYGJhY2tncm91bmQ6ICMzMzk5MzM7IGNvbG9yOiAjZmZmYCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCB0b2FzdFJhd0luc3RhbmNlID0gdGhpcy5wcmVwYXJlUmF3VG9hc3QoZXZlbnRDb250cm9sbGVyLCBfVG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcpO1xuICAgICAgICB0aGlzLmxpc3RlbmVycyhldmVudENvbnRyb2xsZXIpO1xuICAgICAgICB0aGlzLmludGVybmFsUm91dGluZyh0b2FzdFJhd0luc3RhbmNlKTtcbiAgICAgICAgcmV0dXJuIGV2ZW50Q29udHJvbGxlci5hZnRlckNsb3NlZCQ7XG4gICAgfVxuICAgIFxuICAgIGludGVybmFsUm91dGluZyhfVG9hc3RSYXdJbnN0YW5jZTogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMuaXNSZWZMaXN0QXZhaWxhYmxlKCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvUHJvZHVjdGlvbihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFRvQnVmZmVyKF9Ub2FzdFJhd0luc3RhbmNlKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBzZW5kVG9CdWZmZXIoX1RvYXN0UmF3SW5zdGFuY2U6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblJhd1N0YXRlKSB7XG4gICAgICAgIHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0LnB1c2goX1RvYXN0UmF3SW5zdGFuY2UpO1xuICAgIH1cbiAgICBcbiAgICBzZW5kVG9Qcm9kdWN0aW9uKF9Ub2FzdFJhd0luc3RhbmNlOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZSk6IHZvaWQge1xuICAgICAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmdldENvbXBvbmVudFJlZihfVG9hc3RSYXdJbnN0YW5jZSk7XG4gICAgICAgIGlmIChjb21wb25lbnRSZWYpIHtcbiAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0LnB1c2goY29tcG9uZW50UmVmKTtcbiAgICAgICAgICAgIGNvbXBvbmVudFJlZi5pbnN0YW5jZS50b2FzdE5vdGlmaWNhdGlvbkJlbG9uZ2luZyA9IF9Ub2FzdFJhd0luc3RhbmNlLlRvYXN0QmVsb25naW5nO1xuICAgICAgICAgICAgdGhpcy5hcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcbiAgICAgICAgICAgIFxuICAgICAgICB9XG4gICAgfVxuIFxuICAgIGlzUmVmTGlzdEF2YWlsYWJsZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0Lmxlbmd0aCA8IHRoaXMudG9hc3RDb25maWcucHJvZHVjdGlvbkNvbmZpZy5HbG9iYWxTZXR0aW5ncy5BbGxvd2VkTm90aWZpY2F0aW9uc0F0T25jZTtcbiAgICB9XG4gICAgXG4gICAgcHJlcGFyZVJhd1RvYXN0KF9FdmVudHNDb250cm9sbGVyOiBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uRXZlbnRzQ29udHJvbGxlciwgX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nOiBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nKTogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUge1xuICAgICAgICBcbiAgICAgICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICAgIHdlYWtNYXAuc2V0KFRvYXN0Tm90aWZpY2F0aW9uQ2xhc3MuVG9hc3ROb3RpZmljYXRpb25FdmVudHNDb250cm9sbGVyLCBfRXZlbnRzQ29udHJvbGxlcik7XG4gICAgICAgIFxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgV2Vha01hcCAgICAgICA6IHdlYWtNYXAsXG4gICAgICAgICAgICBUb2FzdEJlbG9uZ2luZzogX1RvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nXG4gICAgICAgIH07XG4gICAgfVxuICAgIFxuICAgIGdldENvbXBvbmVudFJlZihfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZTogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uUmF3U3RhdGUpOiBDb21wb25lbnRSZWY8YW55PiB8IG51bGwge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGlhbG9nSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5Ub2FzdEJlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG4gICAgICAgIGlmIChkaWFsb2dJbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIGNvbnN0IGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShUb2FzdE5vdGlmaWNhdGlvbldyYXBwZXJDb21wb25lbnQpO1xuICAgICAgICAgICAgcmV0dXJuIGNvbXBvbmVudEZhY3RvcnkuY3JlYXRlKG5ldyBEaWFsb2dJbmplY3Rvcih0aGlzLmluamVjdG9yLCBfVG9hc3ROb3RpZmljYXRpb25SYXdTdGF0ZS5XZWFrTWFwKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIFxuICAgIGxpc3RlbmVycyhfRXZlbnRzQ29udHJvbGxlcjogVG9hc3ROb3RpZmljYXRpb25DbGFzcy5Ub2FzdE5vdGlmaWNhdGlvbkV2ZW50c0NvbnRyb2xsZXIpIHtcbiAgICAgICAgXG4gICAgICAgIC8vIExpc3RlbmVyIGZvciBjbG9zaW5nIGRpYWxvZ1xuICAgICAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9FdmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUoKHJlc3BvbnNlKSA9PiB7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIC8vIHRoaXMucmVtb3ZlRnJvbUJvZHlQYXJlbnRDb21wb25lbnQobW9kYWxJbmRleCk7XG4gICAgICAgICAgICB0aGlzLnJlbW92ZUZyb21Cb2R5KHJlc3BvbnNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgICAgIGNsb3NlRGlhbG9nU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICAgICAgLy8gYXR0YWNoIHZpZXcgdG8gaWduaXRlIGxpZmVjeWNsZSBob29rc1xuICAgICAgICB0aGlzLmFwcFJlZi5hdHRhY2hWaWV3KF9Db21wb25lbnRSZWYuaG9zdFZpZXcpO1xuICAgICAgICAvLyBET01cbiAgICAgICAgY29uc3QgZG9tRWxlbSAgICAgICAgICAgICAgICAgPSAoX0NvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55Pikucm9vdE5vZGVzWzBdIGFzIEhUTUxFbGVtZW50O1xuICAgICAgICBjb25zdCB0YXJnZXROb2RlOiBIVE1MRWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b2FzdC13cmFwcGVyJyk7XG4gICAgICAgIGNvbnN0IHRvYXN0RW50aXR5ICAgICAgICAgICAgID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIHRvYXN0RW50aXR5LnNldEF0dHJpYnV0ZSgnaWQnLCBfQ29tcG9uZW50UmVmLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgdG9hc3RFbnRpdHkuY2xhc3NOYW1lID0gJ3RvYXN0LWVudGl0eSc7XG4gICAgICAgIHRvYXN0RW50aXR5LnByZXBlbmQoZG9tRWxlbSk7XG4gICAgICAgIC8vIHRhcmdldE5vZGUucHJlcGVuZCh0b2FzdEVudGl0eSk7XG4gICAgICAgIHNldFRpbWVvdXQoKCk9PiB7XG4gICAgICAgICAgICB0YXJnZXROb2RlLnByZXBlbmQodG9hc3RFbnRpdHkpO1xuICAgICAgICB9LCAyMDApO1xuICAgICAgICBcbiAgICAgICAgXG4gICAgfVxuICAgIFxuICAgIHJlbW92ZUZyb21Cb2R5KF9FbnRpdHlVbmlxdWVJRDogc3RyaW5nKTogdm9pZCB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBtb2RhbEluZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0VudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgaWYgKG1vZGFsSW5kZXggPiAtMSkge1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBpZiAodGhpcy5idWZmZXJUb2FzdFJhd0xpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZW5kVG9Qcm9kdWN0aW9uKHRoaXMuYnVmZmVyVG9hc3RSYXdMaXN0WzBdKTtcbiAgICAgICAgICAgICAgICB0aGlzLmJ1ZmZlclRvYXN0UmF3TGlzdC5zcGxpY2UoMCwgMSk7XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLmNsb3NlUGFyZW50JCgnY2xvc2UtZmFzdCcpLnBpcGUobWFwKGl0ZW0gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRW50aXR5VW5pcXVlSUQpO1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0b2FzdEVudGl0eSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEKTtcbiAgICAgICAgICAgICAgICAgICAgdG9hc3RFbnRpdHkucmVtb3ZlKCk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKGAlYyAke3RoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmluc3RhbmNlLnRvYXN0Tm90aWZpY2F0aW9uQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEfSBgLCBgYmFja2dyb3VuZDogI2NjMzMzMzsgY29sb3I6ICNmZmZgKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBSZWYuZGV0YWNoVmlldyh0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdFttb2RhbEluZGV4XS5ob3N0Vmlldyk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMudG9hc3RDb21wb25lbnRSZWZMaXN0W21vZGFsSW5kZXhdLmRlc3Ryb3koKTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50b2FzdENvbXBvbmVudFJlZkxpc3Quc3BsaWNlKG1vZGFsSW5kZXgsIDEpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pKS5zdWJzY3JpYmUoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvYXN0Q29tcG9uZW50UmVmTGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiBfRGlhbG9nVW5pcXVlSUQgPT09IGl0ZW0uaW5zdGFuY2UudG9hc3ROb3RpZmljYXRpb25CZWxvbmdpbmcuRW50aXR5VW5pcXVlSUQ7XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==