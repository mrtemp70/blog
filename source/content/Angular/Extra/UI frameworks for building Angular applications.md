**Ant Design** and **Material Design** are both popular UI frameworks for building Angular applications, but they differ in design philosophy and component offerings.

1. **Ant Design**:
    
    - Focuses on a clean, elegant design with a business-oriented feel.
    - Provides a comprehensive set of high-quality components tailored for enterprise-level applications.
    - Features a more complex, detailed style with a lot of out-of-the-box components, but can be more opinionated in design.
2. **Material Design**:
    
    - Developed by Google, it follows the "material" design language emphasizing simple, flat, and intuitive interfaces.
    - Offers a clean, consistent design, with animations and transitions that create a more fluid user experience.
    - Used widely across both web and mobile platforms, providing a good balance of functionality and aesthetics.

**Finally**:

- Choose **Ant Design** for enterprise-focused, feature-rich UI components.
- Choose **Material Design** for simpler, more widely adopted designs with a focus on consistency and ease of use.
- 
![[ng-angular-ui-component.png]]

**NG-ZORRO (Ant Design) vs Angular Material**:

- **Design System**:
    
    - **NG-ZORRO**: Based on **Ant Design**, offering a business-oriented, elegant design with rich, enterprise-level components.
    - **Angular Material**: Follows **Material Design** by Google, known for its clean, simple, and intuitive user interface with smooth animations.

- **Library Comparisons**:
    - **NG-ZORRO**: Used in Angular with the **NG-ZORRO** library.
    - **Angular Material**: Directly integrated in Angular as **Angular Material**.
    - **React**: Ant Design uses **antd**, while Material Design uses **Material-UI**.
    - **Vue**: Ant Design uses **ant-design-vue**, while Material Design uses **Vue Material**.

Learn more about how to setup NG-ZORRO-: https://medium.com/@sapananavtake27/ng-zorro-203d15ac0b3e.

---

Here are some Angular project templates:

- [CoreUI Angular](https://coreui.io/demos/angular/5.0/bright/#/smart-table)
- [ngx-admin](https://akveo.github.io/ngx-admin/)
- [AdminLTE](https://adminlte.io/themes/v3/index.html)

---
Here's how you can add **ng-zorro-antd** to any Angular project using **cdk**:

1. **Create a new Angular project** (if you don’t already have one):
    
    ```bash
    ng new my-angular-project
    cd my-angular-project
    ```
    
2. **Add ng-zorro-antd to the project**: Run the following command to install ng-zorro-antd using the Angular CLI:
    
    ```bash
    ng add ng-zorro-antd
    ```
    
3. **Add Angular CDK** (if it’s not already installed): The **ng-zorro-antd** library relies on the Angular CDK, so if it's not already installed, run:
    
    ```bash
    npm install @angular/cdk
    ```

4. Now add `"node_modules/ng-zorro-antd/ng-zorro-antd.min.css"` into `angular.json`
    
    ```json
    "styles": [
              "src/theme.less",
              "src/custom-theme.scss",
              "src/styles.css",
              
              "node_modules/ng-zorro-antd/ng-zorro-antd.min.css"
            ]
    ```
    
5. Now create a component and add routing into `app-routing.module.ts`:
    
    ```typescript
  { path: 'user', pathMatch: 'full', component: UserComponent }];
    ```
    
6. **Import the necessary NgZorro module**: In your `app.module.ts`, import the `NzButtonModule` (or any other required ng-zorro modules) and add them to the `imports` array.
    
    ```typescript
    import { NzButtonModule } from 'ng-zorro-antd/button';
    
    @NgModule({
      declarations: [AppComponent],
      imports: [BrowserModule, NzButtonModule],
      bootstrap: [AppComponent]
    })
    export class AppModule {}
    ```
    
7. **Start using ng-zorro components**: Now, you can start using ng-zorro components like buttons in your templates:
    
    ```html
    <button nz-button nzType="primary">Primary Button</button>
    ```
    

That’s it! You've successfully added **ng-zorro-antd** to your Angular project using the Angular CDK.