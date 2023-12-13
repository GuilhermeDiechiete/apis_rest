# COMMANDS ADONIS.JS

## START PROJECT

### (--api-only -> creates the project without the views part )

```
adonis new *projectname* --api-only 
```


## MIGRATIONS

### create migrations file

```
adonis make:migration *migrationName* 
```

### creates migrations in the database

```
adonis migration:run 
```

### undo the last creation

```
adonis migration:reset 
```

### see migrations 

```
adonis migration:status 
```



## SEEDS

### create seed file 

```
adonis make:seed *seedName* 
```

### run seeds

```
adonis seed 
```



## MODELS

### create model file

```
adonis make:model *modelName* 
```



## CONTROLLERS

### create controller file

```
adonis make:controller *controllerName* 
```



## ROUTES

### see available routes

```
adonis route:list 
```

## VALIDATORS

### create validator file

```
adonis make:validator *validatorName*
```
