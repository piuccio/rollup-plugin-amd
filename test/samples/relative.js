define([
    './nested/simple_object',
    './nested/standard_module'
], function(
    object,
    module
) {
    return object.value + module.number;
});
