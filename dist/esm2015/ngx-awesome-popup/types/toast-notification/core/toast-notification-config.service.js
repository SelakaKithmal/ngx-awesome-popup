import * as i0 from '@angular/core';
import {Inject, Injectable} from '@angular/core';
import {ToastNotificationClass} from './model';
import {GlobalClass} from '../../../core/global';
import {DialogLayoutDisplay} from '../../../core/enums';

export class ToastNotificationConfigService {
    constructor(userConfig = {}) {
        this.userConfig       = userConfig;
        this.authorConfig     = new ToastNotificationClass.Settings();
        this.productionConfig = new ToastNotificationClass.Settings();
        // region *** confirmBox userConfig (user input app-module) ***
        const userConfigBase  = new ToastNotificationClass.Settings();
        const dataControl     = new GlobalClass.DataControl();
        dataControl.copyValuesFrom(userConfig.ToastCoreConfig, userConfigBase.ToastCoreConfig); // this will make sure that object has right properties
        userConfig.ToastCoreConfig = userConfigBase.ToastCoreConfig;
        // endregion
        // region *** author default config values (if there is no user input) ***
        this.authorConfig.ToastCoreConfig.Width          = 'auto';
        this.authorConfig.ToastCoreConfig.Height         = 'auto';
        this.authorConfig.ToastCoreConfig.ButtonPosition = 'right';
        // this.authorConfig.ToastCoreConfig.ConfirmLabel   = 'Confirm';
        // this.authorConfig.ToastCoreConfig.DeclineLabel   = 'Decline';
        this.authorConfig.ToastCoreConfig.AutoCloseDelay            = 2500;
        this.authorConfig.ToastCoreConfig.DisableIcon               = true;
        this.authorConfig.ToastCoreConfig.AllowHTMLMessage          = true;
        this.authorConfig.ToastCoreConfig.LayoutType                = DialogLayoutDisplay.NONE;
        this.authorConfig.GlobalSettings.AllowedNotificationsAtOnce = 5;
        // endregion
        // region *** Production setup ***
        dataControl.copyValuesFrom(this.authorConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        dataControl.copyValuesFrom(userConfig.GlobalSettings, this.productionConfig.GlobalSettings);
        dataControl.copyValuesFrom(this.authorConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        dataControl.copyValuesFrom(userConfig.ToastCoreConfig, this.productionConfig.ToastCoreConfig);
        // endregion
    }
}

ToastNotificationConfigService.ɵprov          = i0.ɵɵdefineInjectable({
    factory: function ToastNotificationConfigService_Factory() { return new ToastNotificationConfigService(i0.ɵɵinject("toastNotificationConfig")); },
    token: ToastNotificationConfigService,
    providedIn: "root"
});
ToastNotificationConfigService.decorators     = [
    {
        type: Injectable, args: [{
            providedIn: 'root'
        },]
    }
];
ToastNotificationConfigService.ctorParameters = () => [
    {type: undefined, decorators: [{type: Inject, args: ['toastNotificationConfig',]}]}
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vbmd4LWF3ZXNvbWUtcG9wdXAvdHlwZXMvdG9hc3Qtbm90aWZpY2F0aW9uL2NvcmUvdG9hc3Qtbm90aWZpY2F0aW9uLWNvbmZpZy5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2pELE9BQU8sRUFBQyxzQkFBc0IsRUFBNkIsTUFBTSxTQUFTLENBQUM7QUFDM0UsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFCQUFxQixDQUFDOztBQUt4RCxNQUFNLE9BQU8sOEJBQThCO0lBTXZDLFlBQXVELGFBQXNFLEVBQUU7UUFBeEUsZUFBVSxHQUFWLFVBQVUsQ0FBOEQ7UUFKL0gsaUJBQVksR0FBZ0UsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNsSCxxQkFBZ0IsR0FBNEQsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUs5RywrREFBK0Q7UUFDL0QsTUFBTSxjQUFjLEdBQUcsSUFBSSxzQkFBc0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM3RCxNQUFNLFdBQVcsR0FBTSxJQUFJLFdBQVcsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNyRCxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsY0FBYyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsdURBQXVEO1FBRS9JLFVBQVUsQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDLGVBQWUsQ0FBQztRQUM1RCxZQUFZO1FBRVosMEVBQTBFO1FBQzFFLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxDQUFDLEtBQUssR0FBWSxNQUFNLENBQUM7UUFDMUQsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsTUFBTSxHQUFXLE1BQU0sQ0FBQztRQUMxRCxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxjQUFjLEdBQUcsT0FBTyxDQUFDO1FBQzNELGdFQUFnRTtRQUNoRSxnRUFBZ0U7UUFDaEUsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsY0FBYyxHQUFjLElBQUksQ0FBQztRQUNuRSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxXQUFXLEdBQWlCLElBQUksQ0FBQztRQUNuRSxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxnQkFBZ0IsR0FBWSxJQUFJLENBQUM7UUFDbkUsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsVUFBVSxHQUFrQixtQkFBbUIsQ0FBQyxJQUFJLENBQUM7UUFDdkYsSUFBSSxDQUFDLFlBQVksQ0FBQyxjQUFjLENBQUMsMEJBQTBCLEdBQUcsQ0FBQyxDQUFDO1FBRWhFLFlBQVk7UUFFWixrQ0FBa0M7UUFFbEMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDbkcsV0FBVyxDQUFDLGNBQWMsQ0FBQyxVQUFVLENBQUMsY0FBYyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RixXQUFXLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsZUFBZSxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUNyRyxXQUFXLENBQUMsY0FBYyxDQUFDLFVBQVUsQ0FBQyxlQUFlLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzlGLFlBQVk7SUFDaEIsQ0FBQzs7OztZQXhDSixVQUFVLFNBQUM7Z0JBQ1IsVUFBVSxFQUFFLE1BQU07YUFDckI7Ozs0Q0FPZ0IsTUFBTSxTQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7SW5qZWN0LCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7VG9hc3ROb3RpZmljYXRpb25DbGFzcywgVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2V9IGZyb20gJy4vbW9kZWwnO1xuaW1wb3J0IHtHbG9iYWxDbGFzc30gZnJvbSAnLi4vLi4vLi4vY29yZS9nbG9iYWwnO1xuaW1wb3J0IHtEaWFsb2dMYXlvdXREaXNwbGF5fSBmcm9tICcuLi8uLi8uLi9jb3JlL2VudW1zJztcblxuQEluamVjdGFibGUoe1xuICAgIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBUb2FzdE5vdGlmaWNhdGlvbkNvbmZpZ1NlcnZpY2Uge1xuICAgIFxuICAgIGF1dGhvckNvbmZpZzogVG9hc3ROb3RpZmljYXRpb25JbnRlcmZhY2UuSVRvYXN0Tm90aWZpY2F0aW9uVXNlckNvbmZpZyAgICAgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25DbGFzcy5TZXR0aW5ncygpO1xuICAgIHByb2R1Y3Rpb25Db25maWc6IFRvYXN0Tm90aWZpY2F0aW9uSW50ZXJmYWNlLklUb2FzdE5vdGlmaWNhdGlvblVzZXJDb25maWcgPSBuZXcgVG9hc3ROb3RpZmljYXRpb25DbGFzcy5TZXR0aW5ncygpO1xuICAgIFxuICAgIFxuICAgIGNvbnN0cnVjdG9yKEBJbmplY3QoJ3RvYXN0Tm90aWZpY2F0aW9uQ29uZmlnJykgcHJpdmF0ZSB1c2VyQ29uZmlnOiBUb2FzdE5vdGlmaWNhdGlvbkludGVyZmFjZS5JVG9hc3ROb3RpZmljYXRpb25Vc2VyQ29uZmlnID0ge30pIHtcbiAgICAgICAgXG4gICAgICAgIC8vIHJlZ2lvbiAqKiogY29uZmlybUJveCB1c2VyQ29uZmlnICh1c2VyIGlucHV0IGFwcC1tb2R1bGUpICoqKlxuICAgICAgICBjb25zdCB1c2VyQ29uZmlnQmFzZSA9IG5ldyBUb2FzdE5vdGlmaWNhdGlvbkNsYXNzLlNldHRpbmdzKCk7XG4gICAgICAgIGNvbnN0IGRhdGFDb250cm9sICAgID0gbmV3IEdsb2JhbENsYXNzLkRhdGFDb250cm9sKCk7XG4gICAgICAgIGRhdGFDb250cm9sLmNvcHlWYWx1ZXNGcm9tKHVzZXJDb25maWcuVG9hc3RDb3JlQ29uZmlnLCB1c2VyQ29uZmlnQmFzZS5Ub2FzdENvcmVDb25maWcpOyAvLyB0aGlzIHdpbGwgbWFrZSBzdXJlIHRoYXQgb2JqZWN0IGhhcyByaWdodCBwcm9wZXJ0aWVzXG4gICAgXG4gICAgICAgIHVzZXJDb25maWcuVG9hc3RDb3JlQ29uZmlnID0gdXNlckNvbmZpZ0Jhc2UuVG9hc3RDb3JlQ29uZmlnO1xuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICBcbiAgICAgICAgLy8gcmVnaW9uICoqKiBhdXRob3IgZGVmYXVsdCBjb25maWcgdmFsdWVzIChpZiB0aGVyZSBpcyBubyB1c2VyIGlucHV0KSAqKipcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuVG9hc3RDb3JlQ29uZmlnLldpZHRoICAgICAgICAgID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5Ub2FzdENvcmVDb25maWcuSGVpZ2h0ICAgICAgICAgPSAnYXV0byc7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLlRvYXN0Q29yZUNvbmZpZy5CdXR0b25Qb3NpdGlvbiA9ICdyaWdodCc7XG4gICAgICAgIC8vIHRoaXMuYXV0aG9yQ29uZmlnLlRvYXN0Q29yZUNvbmZpZy5Db25maXJtTGFiZWwgICA9ICdDb25maXJtJztcbiAgICAgICAgLy8gdGhpcy5hdXRob3JDb25maWcuVG9hc3RDb3JlQ29uZmlnLkRlY2xpbmVMYWJlbCAgID0gJ0RlY2xpbmUnO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5Ub2FzdENvcmVDb25maWcuQXV0b0Nsb3NlRGVsYXkgICAgICAgICAgICA9IDI1MDA7XG4gICAgICAgIHRoaXMuYXV0aG9yQ29uZmlnLlRvYXN0Q29yZUNvbmZpZy5EaXNhYmxlSWNvbiAgICAgICAgICAgICAgID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuVG9hc3RDb3JlQ29uZmlnLkFsbG93SFRNTE1lc3NhZ2UgICAgICAgICAgPSB0cnVlO1xuICAgICAgICB0aGlzLmF1dGhvckNvbmZpZy5Ub2FzdENvcmVDb25maWcuTGF5b3V0VHlwZSAgICAgICAgICAgICAgICA9IERpYWxvZ0xheW91dERpc3BsYXkuTk9ORTtcbiAgICAgICAgdGhpcy5hdXRob3JDb25maWcuR2xvYmFsU2V0dGluZ3MuQWxsb3dlZE5vdGlmaWNhdGlvbnNBdE9uY2UgPSA1O1xuICAgIFxuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICBcbiAgICAgICAgLy8gcmVnaW9uICoqKiBQcm9kdWN0aW9uIHNldHVwICoqKlxuICAgIFxuICAgICAgICBkYXRhQ29udHJvbC5jb3B5VmFsdWVzRnJvbSh0aGlzLmF1dGhvckNvbmZpZy5HbG9iYWxTZXR0aW5ncywgdGhpcy5wcm9kdWN0aW9uQ29uZmlnLkdsb2JhbFNldHRpbmdzKTtcbiAgICAgICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20odXNlckNvbmZpZy5HbG9iYWxTZXR0aW5ncywgdGhpcy5wcm9kdWN0aW9uQ29uZmlnLkdsb2JhbFNldHRpbmdzKTtcbiAgICAgICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20odGhpcy5hdXRob3JDb25maWcuVG9hc3RDb3JlQ29uZmlnLCB0aGlzLnByb2R1Y3Rpb25Db25maWcuVG9hc3RDb3JlQ29uZmlnKTtcbiAgICAgICAgZGF0YUNvbnRyb2wuY29weVZhbHVlc0Zyb20odXNlckNvbmZpZy5Ub2FzdENvcmVDb25maWcsIHRoaXMucHJvZHVjdGlvbkNvbmZpZy5Ub2FzdENvcmVDb25maWcpO1xuICAgICAgICAvLyBlbmRyZWdpb25cbiAgICB9XG59XG4iXX0=
