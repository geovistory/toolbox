Steps
* ok – Bundle all models in one file
* ok – Simplyfy import statements using index.ts files
* ok –create a sandbox.store for data-unit/pe-it
* ok – Rework the models according to model-brainstorm
* ok - create sandboxes for value-controls
* * Add a wrapper form and display the form data in the sandbox
* * Done when value controls work in sandbox (write value, onChange, onTouch)

Create tree
* ok – Try to finalize the create pe-it  from leaf to root add sandboxes 
* * ok – te-ent-role-create-ctrl
* * ok – te-ent-role-set-create-ctrl
* * ok – te-ent-create-ctrl
* * ok – pe-it-role-create-ctrl
* * ok – pe-it-role-set-create-ctrl
* * ok – pe-it-create-ctrl
* * ok - pe-it-create-form
* ok – create-pe-it-form
* * ok – Make the  form beautiful


Editable tree
* ok - create a sandbox that generates the state by api call, add all the editable components
* * ok – pe-it-editable
* * ok - pe-it-role-set-editable
* * ok – pe-it-role-editable
* * ok – te-ent-editable
* * ok – te-ent-role-set-editable
* * ok – te-ent-role-editable



Add tree
* ok – create a sandbox that gets nested object of repo by api call, add all the add components
* * ok – pe-it-add-form
* * ok – pe-it-add-ctrl
* * ok – pe-it-role-set-add-ctrl
* * ok – pe-it-role-add-ctrl
* * ok – te-ent-add-ctrl
* * ok – te-ent-role-set-add-ctrl
* * ok – te-ent-role-add-ctrl
* ok - logic for epr
* * ok – create logic for choosing is_in_project
* * ok – logic for choosing is_standard_for_range / domain
* * * ok – add is_standard_for_domain_range by finding the highest count
* * * ok – prevent uncheck is_in_project when is_standard_for_range/domain


Create Value components
* ok – appellation-ctrl
* ok – language-ctrl
* leaf-pe-it-ctrl
* time-primitive-ctrl

create forms

* doing – pe-it-add-form
* * ok – debug multiple inits
* * ok - debug view update on display standard change
* * ok - filtering of pe-it object
* * persist the added entity!!

* doing – pe-it-create-form
* * call api to init a create state
* * Add functionality for adding/removing roles and rolesets 
* * persist the new entity!!

* doing – pe-it-role-set-form
* * persist the selcted existing roles
* * create the new roles

* doing – te-ent-role-set-form
* * persist the selcted existing roles
* * create the new roles


View Value components
* ok – appellation-view
* ok – language-view
* ok – leaf-pe-it-view
* time-primitive-view



