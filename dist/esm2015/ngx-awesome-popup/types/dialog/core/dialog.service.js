import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector, } from "@angular/core";
import { map } from "rxjs/operators";
import { DialogInjector } from "../../../core/dialog-injector";
import { DialogWrapperComponent } from "../dialog-wrapper/dialog-wrapper.component";
import { DialogClass } from "./model";
import * as i0 from "@angular/core";
export class DialogService {
    constructor(componentFactoryResolver, injector, appRef) {
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
        this.appRef = appRef;
        this.dialogParentComponentRefList = [];
    }
    open(_ComponentType, _DialogBelonging) {
        const dialogController = _DialogBelonging.EventsController;
        const componentRef = this.getComponentRef(dialogController, _DialogBelonging);
        this.dialogParentComponentRefList.push(componentRef);
        componentRef.instance.dialogBelonging = _DialogBelonging;
        componentRef.instance.childComponentType = _ComponentType;
        this.appendToBodyParentComponent(componentRef);
        this.listeners(dialogController);
        return dialogController;
    }
    getComponentRef(_EventsController, _DialogBelonging) {
        let componentFactory;
        const dialogIndex = this.findDialogIndex(_DialogBelonging.EntityUniqueID);
        if (dialogIndex === -1) {
            const weakMap = new WeakMap();
            weakMap.set(DialogClass.DialogEventsController, _EventsController);
            componentFactory = this.componentFactoryResolver.resolveComponentFactory(DialogWrapperComponent);
            return componentFactory.create(new DialogInjector(this.injector, weakMap));
        }
        return null;
    }
    listeners(_EventsController) {
        // Listener for closing dialog
        const closeDialogSubscription = _EventsController.afterClosed$.subscribe((response) => {
            const modalIndex = this.findDialogIndex(response.DialogBelonging.EntityUniqueID);
            this.removeFromBodyDialogWrapperComponent(modalIndex);
            closeDialogSubscription.unsubscribe();
        });
        // Listener for turning off loader
        const closeLoaderSubscription = _EventsController.afterLoader$.subscribe((_DialogUniqueID) => {
            if (_DialogUniqueID) {
                const modalIndex = this.findDialogIndex(_DialogUniqueID);
                if (modalIndex !== -1) {
                    this.dialogParentComponentRefList[modalIndex].instance.closeLoader();
                }
            }
            closeLoaderSubscription.unsubscribe();
        });
    }
    childComponentResolver() { }
    appendToBodyParentComponent(_ComponentRef) {
        // attach view to ignite lifecycle hooks
        this.appRef.attachView(_ComponentRef.hostView);
        // DOM
        const domElem = _ComponentRef.hostView
            .rootNodes[0];
        document.body.appendChild(domElem);
    }
    closeDialogWrapperComponent(_DialogUniqueID) {
        const modalIndex = this.findDialogIndex(_DialogUniqueID);
        this.removeFromBodyDialogWrapperComponent(modalIndex);
    }
    removeFromBodyDialogWrapperComponent(_DialogIndex) {
        if (_DialogIndex > -1) {
            this.dialogParentComponentRefList[_DialogIndex].instance
                .closeParent$("close-fast")
                .pipe(map((item) => {
                this.appRef.detachView(this.dialogParentComponentRefList[_DialogIndex].hostView);
                this.dialogParentComponentRefList[_DialogIndex].destroy();
                this.dialogParentComponentRefList.splice(_DialogIndex, 1);
            }))
                .subscribe();
        }
    }
    findDialogIndex(_DialogUniqueID) {
        return this.dialogParentComponentRefList.findIndex((item) => {
            return _DialogUniqueID === item.instance.dialogBelonging.EntityUniqueID;
        });
    }
}
DialogService.ɵprov = i0.ɵɵdefineInjectable({ factory: function DialogService_Factory() { return new DialogService(i0.ɵɵinject(i0.ComponentFactoryResolver), i0.ɵɵinject(i0.INJECTOR), i0.ɵɵinject(i0.ApplicationRef)); }, token: DialogService, providedIn: "root" });
DialogService.decorators = [
    { type: Injectable, args: [{
                providedIn: "root",
            },] }
];
DialogService.ctorParameters = () => [
    { type: ComponentFactoryResolver },
    { type: Injector },
    { type: ApplicationRef }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlhbG9nLnNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9uZ3gtYXdlc29tZS1wb3B1cC90eXBlcy9kaWFsb2cvY29yZS9kaWFsb2cuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQ0wsY0FBYyxFQUNkLHdCQUF3QixFQUd4QixVQUFVLEVBQ1YsUUFBUSxHQUVULE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUNyQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDL0QsT0FBTyxFQUFFLHNCQUFzQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDcEYsT0FBTyxFQUFFLFdBQVcsRUFBbUIsTUFBTSxTQUFTLENBQUM7O0FBS3ZELE1BQU0sT0FBTyxhQUFhO0lBR3hCLFlBQ1Usd0JBQWtELEVBQ2xELFFBQWtCLEVBQ2xCLE1BQXNCO1FBRnRCLDZCQUF3QixHQUF4Qix3QkFBd0IsQ0FBMEI7UUFDbEQsYUFBUSxHQUFSLFFBQVEsQ0FBVTtRQUNsQixXQUFNLEdBQU4sTUFBTSxDQUFnQjtRQUxoQyxpQ0FBNEIsR0FBd0IsRUFBRSxDQUFDO0lBTXBELENBQUM7SUFFSixJQUFJLENBQ0YsY0FBeUIsRUFDekIsZ0JBQTZDO1FBRTdDLE1BQU0sZ0JBQWdCLEdBQUcsZ0JBQWdCLENBQUMsZ0JBQWdCLENBQUM7UUFDM0QsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLGVBQWUsQ0FDdkMsZ0JBQWdCLEVBQ2hCLGdCQUFnQixDQUNqQixDQUFDO1FBRUYsSUFBSSxDQUFDLDRCQUE0QixDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNyRCxZQUFZLENBQUMsUUFBUSxDQUFDLGVBQWUsR0FBRyxnQkFBZ0IsQ0FBQztRQUN6RCxZQUFZLENBQUMsUUFBUSxDQUFDLGtCQUFrQixHQUFHLGNBQWMsQ0FB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QUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FDcEIsSUFBSSxDQUFDLDRCQUE0QixDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FDekQsQ0FBQztnQkFDRixJQUFJLENBQUMsNEJBQTRCLENBQUMsWUFBWSxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzFELElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUNIO2lCQUNBLFNBQVMsRUFBRSxDQUFDO1NBQ2hCO0lBQ0gsQ0FBQztJQUVELGVBQWUsQ0FBQyxlQUF1QjtRQUNyQyxPQUFPLElBQUksQ0FBQyw0QkFBNEIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUMxRCxPQUFPLGVBQWUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUM7UUFDMUUsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7O1lBMUhGLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7O1lBZEMsd0JBQXdCO1lBSXhCLFFBQVE7WUFMUixjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQXBwbGljYXRpb25SZWYsXG4gIENvbXBvbmVudEZhY3RvcnlSZXNvbHZlcixcbiAgQ29tcG9uZW50UmVmLFxuICBFbWJlZGRlZFZpZXdSZWYsXG4gIEluamVjdGFibGUsXG4gIEluamVjdG9yLFxuICBUeXBlLFxufSBmcm9tIFwiQGFuZ3VsYXIvY29yZVwiO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSBcInJ4anMvb3BlcmF0b3JzXCI7XG5pbXBvcnQgeyBEaWFsb2dJbmplY3RvciB9IGZyb20gXCIuLi8uLi8uLi9jb3JlL2RpYWxvZy1pbmplY3RvclwiO1xuaW1wb3J0IHsgRGlhbG9nV3JhcHBlckNvbXBvbmVudCB9IGZyb20gXCIuLi9kaWFsb2ctd3JhcHBlci9kaWFsb2ctd3JhcHBlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IERpYWxvZ0NsYXNzLCBEaWFsb2dJbnRlcmZhY2UgfSBmcm9tIFwiLi9tb2RlbFwiO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46IFwicm9vdFwiLFxufSlcbmV4cG9ydCBjbGFzcyBEaWFsb2dTZXJ2aWNlIHtcbiAgZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdDogQ29tcG9uZW50UmVmPGFueT5bXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgY29tcG9uZW50RmFjdG9yeVJlc29sdmVyOiBDb21wb25lbnRGYWN0b3J5UmVzb2x2ZXIsXG4gICAgcHJpdmF0ZSBpbmplY3RvcjogSW5qZWN0b3IsXG4gICAgcHJpdmF0ZSBhcHBSZWY6IEFwcGxpY2F0aW9uUmVmXG4gICkge31cblxuICBvcGVuKFxuICAgIF9Db21wb25lbnRUeXBlOiBUeXBlPGFueT4sXG4gICAgX0RpYWxvZ0JlbG9uZ2luZzogRGlhbG9nQ2xhc3MuRGlhbG9nQmVsb25naW5nXG4gICk6IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nRXZlbnRzQ29udHJvbGxlciB7XG4gICAgY29uc3QgZGlhbG9nQ29udHJvbGxlciA9IF9EaWFsb2dCZWxvbmdpbmcuRXZlbnRzQ29udHJvbGxlcjtcbiAgICBjb25zdCBjb21wb25lbnRSZWYgPSB0aGlzLmdldENvbXBvbmVudFJlZihcbiAgICAgIGRpYWxvZ0NvbnRyb2xsZXIsXG4gICAgICBfRGlhbG9nQmVsb25naW5nXG4gICAgKTtcblxuICAgIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdC5wdXNoKGNvbXBvbmVudFJlZik7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmRpYWxvZ0JlbG9uZ2luZyA9IF9EaWFsb2dCZWxvbmdpbmc7XG4gICAgY29tcG9uZW50UmVmLmluc3RhbmNlLmNoaWxkQ29tcG9uZW50VHlwZSA9IF9Db21wb25lbnRUeXBlO1xuXG4gICAgdGhpcy5hcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoY29tcG9uZW50UmVmKTtcblxuICAgIHRoaXMubGlzdGVuZXJzKGRpYWxvZ0NvbnRyb2xsZXIpO1xuXG4gICAgcmV0dXJuIGRpYWxvZ0NvbnRyb2xsZXI7XG4gIH1cblxuICBnZXRDb21wb25lbnRSZWYoXG4gICAgX0V2ZW50c0NvbnRyb2xsZXI6IERpYWxvZ0ludGVyZmFjZS5JRGlhbG9nRXZlbnRzQ29udHJvbGxlcixcbiAgICBfRGlhbG9nQmVsb25naW5nOiBEaWFsb2dDbGFzcy5EaWFsb2dCZWxvbmdpbmdcbiAgKTogQ29tcG9uZW50UmVmPGFueT4gfCBudWxsIHtcbiAgICBsZXQgY29tcG9uZW50RmFjdG9yeTtcblxuICAgIGNvbnN0IGRpYWxvZ0luZGV4ID0gdGhpcy5maW5kRGlhbG9nSW5kZXgoX0RpYWxvZ0JlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRCk7XG4gICAgaWYgKGRpYWxvZ0luZGV4ID09PSAtMSkge1xuICAgICAgY29uc3Qgd2Vha01hcCA9IG5ldyBXZWFrTWFwKCk7XG4gICAgICB3ZWFrTWFwLnNldChEaWFsb2dDbGFzcy5EaWFsb2dFdmVudHNDb250cm9sbGVyLCBfRXZlbnRzQ29udHJvbGxlcik7XG5cbiAgICAgIGNvbXBvbmVudEZhY3RvcnkgPSB0aGlzLmNvbXBvbmVudEZhY3RvcnlSZXNvbHZlci5yZXNvbHZlQ29tcG9uZW50RmFjdG9yeShcbiAgICAgICAgRGlhbG9nV3JhcHBlckNvbXBvbmVudFxuICAgICAgKTtcbiAgICAgIHJldHVybiBjb21wb25lbnRGYWN0b3J5LmNyZWF0ZShcbiAgICAgICAgbmV3IERpYWxvZ0luamVjdG9yKHRoaXMuaW5qZWN0b3IsIHdlYWtNYXApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgbGlzdGVuZXJzKF9FdmVudHNDb250cm9sbGVyOiBEaWFsb2dJbnRlcmZhY2UuSURpYWxvZ0V2ZW50c0NvbnRyb2xsZXIpIHtcbiAgICAvLyBMaXN0ZW5lciBmb3IgY2xvc2luZyBkaWFsb2dcbiAgICBjb25zdCBjbG9zZURpYWxvZ1N1YnNjcmlwdGlvbiA9IF9FdmVudHNDb250cm9sbGVyLmFmdGVyQ2xvc2VkJC5zdWJzY3JpYmUoXG4gICAgICAocmVzcG9uc2UpID0+IHtcbiAgICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KFxuICAgICAgICAgIHJlc3BvbnNlLkRpYWxvZ0JlbG9uZ2luZy5FbnRpdHlVbmlxdWVJRFxuICAgICAgICApO1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21Cb2R5RGlhbG9nV3JhcHBlckNvbXBvbmVudChtb2RhbEluZGV4KTtcbiAgICAgICAgY2xvc2VEaWFsb2dTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gTGlzdGVuZXIgZm9yIHR1cm5pbmcgb2ZmIGxvYWRlclxuICAgIGNvbnN0IGNsb3NlTG9hZGVyU3Vic2NyaXB0aW9uID0gX0V2ZW50c0NvbnRyb2xsZXIuYWZ0ZXJMb2FkZXIkLnN1YnNjcmliZShcbiAgICAgIChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoX0RpYWxvZ1VuaXF1ZUlEKSB7XG4gICAgICAgICAgY29uc3QgbW9kYWxJbmRleCA9IHRoaXMuZmluZERpYWxvZ0luZGV4KF9EaWFsb2dVbmlxdWVJRCk7XG4gICAgICAgICAgaWYgKG1vZGFsSW5kZXggIT09IC0xKSB7XG4gICAgICAgICAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3RbXG4gICAgICAgICAgICAgIG1vZGFsSW5kZXhcbiAgICAgICAgICAgIF0uaW5zdGFuY2UuY2xvc2VMb2FkZXIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBjbG9zZUxvYWRlclN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgICAgfVxuICAgICk7XG4gIH1cblxuICBjaGlsZENvbXBvbmVudFJlc29sdmVyKCkge31cblxuICBhcHBlbmRUb0JvZHlQYXJlbnRDb21wb25lbnQoX0NvbXBvbmVudFJlZjogQ29tcG9uZW50UmVmPGFueT4pOiB2b2lkIHtcbiAgICAvLyBhdHRhY2ggdmlldyB0byBpZ25pdGUgbGlmZWN5Y2xlIGhvb2tzXG4gICAgdGhpcy5hcHBSZWYuYXR0YWNoVmlldyhfQ29tcG9uZW50UmVmLmhvc3RWaWV3KTtcblxuICAgIC8vIERPTVxuICAgIGNvbnN0IGRvbUVsZW0gPSAoX0NvbXBvbmVudFJlZi5ob3N0VmlldyBhcyBFbWJlZGRlZFZpZXdSZWY8YW55PilcbiAgICAgIC5yb290Tm9kZXNbMF0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkb21FbGVtKTtcbiAgfVxuXG4gIGNsb3NlRGlhbG9nV3JhcHBlckNvbXBvbmVudChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZykge1xuICAgIGNvbnN0IG1vZGFsSW5kZXggPSB0aGlzLmZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQpO1xuICAgIHRoaXMucmVtb3ZlRnJvbUJvZHlEaWFsb2dXcmFwcGVyQ29tcG9uZW50KG1vZGFsSW5kZXgpO1xuICB9XG5cbiAgcmVtb3ZlRnJvbUJvZHlEaWFsb2dXcmFwcGVyQ29tcG9uZW50KF9EaWFsb2dJbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKF9EaWFsb2dJbmRleCA+IC0xKSB7XG4gICAgICB0aGlzLmRpYWxvZ1BhcmVudENvbXBvbmVudFJlZkxpc3RbX0RpYWxvZ0luZGV4XS5pbnN0YW5jZVxuICAgICAgICAuY2xvc2VQYXJlbnQkKFwiY2xvc2UtZmFzdFwiKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICBtYXAoKGl0ZW0pID0+IHtcbiAgICAgICAgICAgIHRoaXMuYXBwUmVmLmRldGFjaFZpZXcoXG4gICAgICAgICAgICAgIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdFtfRGlhbG9nSW5kZXhdLmhvc3RWaWV3XG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dQYXJlbnRDb21wb25lbnRSZWZMaXN0W19EaWFsb2dJbmRleF0uZGVzdHJveSgpO1xuICAgICAgICAgICAgdGhpcy5kaWFsb2dQYXJlbnRDb21wb25lbnRSZWZMaXN0LnNwbGljZShfRGlhbG9nSW5kZXgsIDEpO1xuICAgICAgICAgIH0pXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIGZpbmREaWFsb2dJbmRleChfRGlhbG9nVW5pcXVlSUQ6IHN0cmluZyk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuZGlhbG9nUGFyZW50Q29tcG9uZW50UmVmTGlzdC5maW5kSW5kZXgoKGl0ZW0pID0+IHtcbiAgICAgIHJldHVybiBfRGlhbG9nVW5pcXVlSUQgPT09IGl0ZW0uaW5zdGFuY2UuZGlhbG9nQmVsb25naW5nLkVudGl0eVVuaXF1ZUlEO1xuICAgIH0pO1xuICB9XG59XG4iXX0=