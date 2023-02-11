module.exports = plop => {
  plop.setGenerator("component", {
    description: "Create a component",
    // User input prompts provided as arguments to the template
    prompts: [
      {
        // Raw text input
        type: "input",
        // Variable name for this input
        name: "name",
        // Prompt to display on command line
        message: "What is your component name?",
      },
      {
        // Raw text input
        type: "confirm",
        // Variable name for this input
        name: "isBasic",
        // Prompt to display on command line
        message: "Is it basic component?",
      },
    ],
    actions: data => {
      const path = data.isBasic ? "src/Components/Basic" : "src/Components";
      const exportConfit = data.isBasic
        ? {
            type: "append",
            path: `${path}/index.ts`,
            pattern: `/* ADD_BASIC_COMPONENT_EXPORT_HERE */`,
            template: `export { {{pascalCase name}} } from "./{{pascalCase name}}";`,
          }
        : {
            type: "append",
            path: `${path}/index.ts`,
            pattern: `/* ADD_COMPONENT_EXPORT_HERE */`,
            template: `export { {{pascalCase name}} } from "@Components/{{pascalCase name}}";`,
          };

      const actions = [
        {
          // Add a new file
          type: "add",
          // Path for the new file
          path: `${path}/{{pascalCase name}}/index.tsx`,
          // Handlebars template used to generate content of new file
          templateFile: "plop-templates/Component/Component.ts.hbs",
        },
        {
          type: "add",
          path: `${path}/{{pascalCase name}}/{{pascalCase name}}.test.ts`,
          templateFile: "plop-templates/Component/Component.test.ts.hbs",
        },
        {
          type: "add",
          path: `${path}/{{pascalCase name}}/styles.module.scss`,
          templateFile: "plop-templates/Component/Component.module.scss.hbs",
        },
        {
          type: "add",
          path: `${path}/{{pascalCase name}}/{{pascalCase name}}.stories.tsx`,
          templateFile: "plop-templates/Component/Component.stories.tsx.hbs",
        },
        exportConfit,
      ];

      return actions;
    },
  });
  plop.setGenerator("page", {
    description: "Create a page",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your page name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "pages/{{pascalCase name}}/index.tsx",
        templateFile: "plop-templates/Page/Page.tsx.hbs",
      },
      {
        type: "add",
        path: "src/Interfaces/Pages/{{pascalCase name}}.d.ts",
        templateFile: "plop-templates/Page/IPage.ts.hbs",
      },
      {
        type: "append",
        path: "src/Redux/IStore.d.ts",
        pattern: `/* Add_Page_IStore_Here */`,
        template: "{{camelCase name}}: I{{pascalCase name}}.IStateProps;",
      },
      {
        type: "append",
        path: "src/Interfaces/index.ts",
        pattern: `/* ADD_PAGE_INTERFACE_EXPORT_HERE */`,
        template: `export * from "@Interfaces/Pages/{{pascalCase name}}";`,
      },
    ],
  });
  plop.setGenerator("hook", {
    description: "Create a custom react hook",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your hook name?",
      },
    ],
    actions: [
      {
        type: "add",
        path: "src/Hooks/use{{pascalCase name}}.ts",
        templateFile: "plop-templates/hook/hook.ts.hbs",
      },
    ],
  });
  plop.setGenerator("service", {
    description: "Create (api) service",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your service name?",
      },
    ],
    actions: [
      {
        type: "add",
        path:
          "src/Services/API/{{pascalCase name}}/{{pascalCase name}}Payload.d.ts",
        templateFile: "plop-templates/service/payload.ts.hbs",
      },
      {
        type: "add",
        path:
          "src/Services/API/{{pascalCase name}}/{{pascalCase name}}Response.d.ts",
        templateFile: "plop-templates/service/response.ts.hbs",
      },
      {
        type: "add",
        path: "src/Services/API/{{pascalCase name}}/index.spec.ts",
        templateFile: "plop-templates/service/test.ts.hbs",
      },
      {
        type: "add",
        path: "src/Services/API/{{pascalCase name}}/index.ts",
        templateFile: "plop-templates/service/index.ts.hbs",
      },
      {
        type: "add",
        path: "src/Services/API/{{pascalCase name}}/{{pascalCase name}}.d.ts",
        templateFile: "plop-templates/service/model.ts.hbs",
      },
      {
        type: "append",
        path: "src/Services/index.ts",
        pattern: `/* EXPORT_SERVICE_HERE */`,
        template: `export { {{pascalCase name}}Service } from '@Services/API/{{pascalCase name}}';`,
      },
      {
        type: "append",
        path: "src/Interfaces/index.ts",
        pattern: `/* EXPORT_SERVICE_DETAILS_HERE */`,
        template: `export * from "@Services/API/{{pascalCase name}}/{{pascalCase name}}Payload";
export * from "@Services/API/{{pascalCase name}}/{{pascalCase name}}Response";
export * from "@Services/API/{{pascalCase name}}/{{pascalCase name}}";
`,
      },
    ],
  });
};
