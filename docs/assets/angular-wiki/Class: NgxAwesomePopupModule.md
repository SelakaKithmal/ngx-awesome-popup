# Class: NgxAwesomePopupModule

This is the main module of the library, it is crucial to be added within angular.app
imports as an example with optional argument, look: [IGlobalUserConfig](#/documentation/Interface:%20IGlobalUserConfig)

```typescript
// app.module imports:
NgxAwesomePopupModule.forRoot({
    ColorList: {
           Primary  : '#ff9e00', // optional
           Secondary: '#989ea5', // optional
           Info     : '#2f8ee5', // optional
           Success  : '#3caea3', // optional
           Warning  : '#ffc107', // optional
           Danger   : '#e46464', // optional
           Light    : '#fbfbfb', // optional
           Dark     : '#343a40'  // optional
          }
})
```

## Constructors

### constructor

\+ **new NgxAwesomePopupModule**(`injector`: *Injector*, `gConfigService`: *GlobalConfigService*): [*NgxAwesomePopupModule*](#/documentation/Class:%20NgxAwesomePopupModule)

#### Parameters:

| Name | Type |
| :------ | :------ |
| `injector` | *Injector* |
| `gConfigService` | *GlobalConfigService* |

**Returns:** [*NgxAwesomePopupModule*](#/documentation/Class:%20NgxAwesomePopupModule)

## Methods

### forRoot

▸ `Static`**forRoot**(`globalConfig?`: [*IGlobalUserConfig*](#/documentation/Interface:%20IGlobalUserConfig)): *ModuleWithProviders*<[*NgxAwesomePopupModule*](#/documentation/Class:%20NgxAwesomePopupModule)\>

#### Parameters:

| Name | Type |
| :------ | :------ |
| `globalConfig?` | [*IGlobalUserConfig*](#/documentation/Interface:%20IGlobalUserConfig) |

**Returns:** *ModuleWithProviders*<[*NgxAwesomePopupModule*](#/documentation/Class:%20NgxAwesomePopupModule)\>
