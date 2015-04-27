var FILE;

FILE = FILE || {};

FILE.phpDirectory = './file';

FILE.Status = {
  OK: 'OK'
};

FILE.exisits = function(path, callback) {
  var data;
  data = {
    path: path
  };
  return $.getJSON(FILE.phpDirectory + "/exists.php", data, function(res) {
    if (res.status === FILE.Status.OK) {
      return callback(res.result);
    } else {
      return callback(null);
    }
  });
};

FILE.saveFrame = function(canvas, filename, index, callback) {
  var ext, split, type;
  split = filename.split('.');
  ext = split[split.length - 1].toLowerCase();
  type = "";
  if (ext === "png") {
    type = "image/png";
  } else if (ext === "jpg" || ext === "jpeg") {
    type = "image/jpeg";
  } else {
    callback(null);
    return;
  }
  return $.ajax({
    type: 'POST',
    url: FILE.phpDirectory + "/saveFrame.php",
    data: {
      name: name,
      directory: directory,
      index: index,
      image: canvas.toDataURL(type)
    },
    success: (function(_this) {
      return function(json) {
        var res;
        res = $.parseJSON(json);
        if (res.status === FILE.Status.OK) {
          return callback(res.result);
        } else {
          return callback(null);
        }
      };
    })(this)
  });
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5maWxlLmNvZmZlZSJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxJQUFBLElBQUE7O0FBQUEsSUFBQSxHQUFPLElBQUEsSUFBUSxFQUFmLENBQUE7O0FBQUEsSUFFSSxDQUFDLFlBQUwsR0FBb0IsUUFGcEIsQ0FBQTs7QUFBQSxJQUlJLENBQUMsTUFBTCxHQUNDO0FBQUEsRUFBQSxFQUFBLEVBQUksSUFBSjtDQUxELENBQUE7O0FBQUEsSUFPSSxDQUFDLE9BQUwsR0FBZSxTQUFDLElBQUQsRUFBTyxRQUFQLEdBQUE7QUFDZCxNQUFBLElBQUE7QUFBQSxFQUFBLElBQUEsR0FDQztBQUFBLElBQUEsSUFBQSxFQUFNLElBQU47R0FERCxDQUFBO1NBR0EsQ0FBQyxDQUFDLE9BQUYsQ0FBYSxJQUFJLENBQUMsWUFBTixHQUFtQixhQUEvQixFQUE2QyxJQUE3QyxFQUFtRCxTQUFDLEdBQUQsR0FBQTtBQUNsRCxJQUFBLElBQUcsR0FBRyxDQUFDLE1BQUosS0FBYyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQTdCO2FBQ0MsUUFBQSxDQUFVLEdBQUcsQ0FBQyxNQUFkLEVBREQ7S0FBQSxNQUFBO2FBR0MsUUFBQSxDQUFVLElBQVYsRUFIRDtLQURrRDtFQUFBLENBQW5ELEVBSmM7QUFBQSxDQVBmLENBQUE7O0FBQUEsSUFpQkksQ0FBQyxTQUFMLEdBQWlCLFNBQUMsTUFBRCxFQUFTLFFBQVQsRUFBbUIsS0FBbkIsRUFBMEIsUUFBMUIsR0FBQTtBQUVoQixNQUFBLGdCQUFBO0FBQUEsRUFBQSxLQUFBLEdBQVEsUUFBUSxDQUFDLEtBQVQsQ0FBZSxHQUFmLENBQVIsQ0FBQTtBQUFBLEVBQ0EsR0FBQSxHQUFNLEtBQU8sQ0FBQSxLQUFLLENBQUMsTUFBTixHQUFlLENBQWYsQ0FBa0IsQ0FBQyxXQUExQixDQUFBLENBRE4sQ0FBQTtBQUFBLEVBR0EsSUFBQSxHQUFPLEVBSFAsQ0FBQTtBQUtBLEVBQUEsSUFBRyxHQUFBLEtBQU8sS0FBVjtBQUNDLElBQUEsSUFBQSxHQUFPLFdBQVAsQ0FERDtHQUFBLE1BRUssSUFBRyxHQUFBLEtBQU8sS0FBUCxJQUFpQixHQUFBLEtBQU8sTUFBM0I7QUFDSixJQUFBLElBQUEsR0FBTyxZQUFQLENBREk7R0FBQSxNQUFBO0FBR0osSUFBQSxRQUFBLENBQVMsSUFBVCxDQUFBLENBQUE7QUFDQSxVQUFBLENBSkk7R0FQTDtTQWNBLENBQUMsQ0FBQyxJQUFGLENBQ0M7QUFBQSxJQUFBLElBQUEsRUFBTSxNQUFOO0FBQUEsSUFDQSxHQUFBLEVBQVEsSUFBSSxDQUFDLFlBQU4sR0FBbUIsZ0JBRDFCO0FBQUEsSUFFQSxJQUFBLEVBQ0M7QUFBQSxNQUFBLElBQUEsRUFBTSxJQUFOO0FBQUEsTUFDQSxTQUFBLEVBQVcsU0FEWDtBQUFBLE1BRUEsS0FBQSxFQUFPLEtBRlA7QUFBQSxNQUdBLEtBQUEsRUFBTyxNQUFNLENBQUMsU0FBUCxDQUFpQixJQUFqQixDQUhQO0tBSEQ7QUFBQSxJQVFBLE9BQUEsRUFBUyxDQUFBLFNBQUEsS0FBQSxHQUFBO2FBQUEsU0FBQyxJQUFELEdBQUE7QUFDUixZQUFBLEdBQUE7QUFBQSxRQUFBLEdBQUEsR0FBTSxDQUFDLENBQUMsU0FBRixDQUFhLElBQWIsQ0FBTixDQUFBO0FBQ0EsUUFBQSxJQUFHLEdBQUcsQ0FBQyxNQUFKLEtBQWMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUE3QjtpQkFDQyxRQUFBLENBQVUsR0FBRyxDQUFDLE1BQWQsRUFERDtTQUFBLE1BQUE7aUJBR0MsUUFBQSxDQUFVLElBQVYsRUFIRDtTQUZRO01BQUEsRUFBQTtJQUFBLENBQUEsQ0FBQSxDQUFBLElBQUEsQ0FSVDtHQURELEVBaEJnQjtBQUFBLENBakJqQixDQUFBIiwiZmlsZSI6ImpxdWVyeS5maWxlLmpzIiwic291cmNlUm9vdCI6Ii9zb3VyY2UvIiwic291cmNlc0NvbnRlbnQiOlsiRklMRSA9IEZJTEUgfHwge31cblxuRklMRS5waHBEaXJlY3RvcnkgPSAnLi9maWxlJ1xuXG5GSUxFLlN0YXR1cyA9XG5cdE9LOiAnT0snXG5cbkZJTEUuZXhpc2l0cyA9IChwYXRoLCBjYWxsYmFjaykgLT5cblx0ZGF0YSA9XG5cdFx0cGF0aDogcGF0aFxuXG5cdCQuZ2V0SlNPTiBcIiN7RklMRS5waHBEaXJlY3Rvcnl9L2V4aXN0cy5waHBcIiwgZGF0YSwgKHJlcyktPlxuXHRcdGlmIHJlcy5zdGF0dXMgPT0gRklMRS5TdGF0dXMuT0tcblx0XHRcdGNhbGxiYWNrKCByZXMucmVzdWx0IClcblx0XHRlbHNlXG5cdFx0XHRjYWxsYmFjayggbnVsbCApXG5cbkZJTEUuc2F2ZUZyYW1lID0gKGNhbnZhcywgZmlsZW5hbWUsIGluZGV4LCBjYWxsYmFjaykgLT5cblxuXHRzcGxpdCA9IGZpbGVuYW1lLnNwbGl0KCcuJylcblx0ZXh0ID0gc3BsaXRbIHNwbGl0Lmxlbmd0aCAtIDEgXS50b0xvd2VyQ2FzZSgpXG5cblx0dHlwZSA9IFwiXCJcblxuXHRpZiBleHQgPT0gXCJwbmdcIlxuXHRcdHR5cGUgPSBcImltYWdlL3BuZ1wiXG5cdGVsc2UgaWYgZXh0ID09IFwianBnXCIgb3IgIGV4dCA9PSBcImpwZWdcIlxuXHRcdHR5cGUgPSBcImltYWdlL2pwZWdcIlxuXHRlbHNlXG5cdFx0Y2FsbGJhY2sobnVsbClcblx0XHRyZXR1cm5cblxuXG5cdCQuYWpheFxuXHRcdHR5cGU6ICdQT1NUJ1xuXHRcdHVybDogXCIje0ZJTEUucGhwRGlyZWN0b3J5fS9zYXZlRnJhbWUucGhwXCJcblx0XHRkYXRhOlxuXHRcdFx0bmFtZTogbmFtZVxuXHRcdFx0ZGlyZWN0b3J5OiBkaXJlY3Rvcnlcblx0XHRcdGluZGV4OiBpbmRleFxuXHRcdFx0aW1hZ2U6IGNhbnZhcy50b0RhdGFVUkwodHlwZSlcblxuXHRcdHN1Y2Nlc3M6IChqc29uKSA9PlxuXHRcdFx0cmVzID0gJC5wYXJzZUpTT04oIGpzb24gKVxuXHRcdFx0aWYgcmVzLnN0YXR1cyA9PSBGSUxFLlN0YXR1cy5PS1xuXHRcdFx0XHRjYWxsYmFjayggcmVzLnJlc3VsdCApXG5cdFx0XHRlbHNlXG5cdFx0XHRcdGNhbGxiYWNrKCBudWxsIClcblx0Il19