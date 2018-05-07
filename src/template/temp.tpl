<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport"
    content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
  <style>
    a {
      display: inline-block;
      margin: 10px 100px;
    }
  </style>
  <title>{{title}}</title>
</head>
<body>
  {{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a><br/>
  {{/each}}
<script>

</script>
<script>
</script>
</body>
</html>
