var CMC_SIZE, CanvasMatrixCode, data, json, str, uint8;

CMC_SIZE = 3;

CanvasMatrixCode = {};

str = null;

uint8 = null;

data = {
  title: "Hello World",
  value: 123456789
};

json = JSON.stringify(data);

CanvasMatrixCode.draw = function(canvas, data, x, y, width, height) {
  var _x, _y, arrayBuff, b, buff, col, ctx, i, j, results, row, u, v;
  ctx = canvas.getContext('2d');
  arrayBuff = CanvasMatrixCode.strToBuff(JSON.stringify(data));
  buff = new Uint8Array(arrayBuff);
  col = Math.floor(width / (CMC_SIZE * 8));
  row = Math.floor(height / CMC_SIZE);
  u = v = 0;
  _x = _y = 0;
  if (col * row + 1 < buff.length) {
    console.log("[CanvasMatrixCode] destination rect is too small for data.");
    return null;
  }
  results = [];
  for (i in buff) {
    b = buff[i];
    u = i % col;
    v = Math.floor(i / col);
    results.push((function() {
      var k, results1;
      results1 = [];
      for (j = k = 0; k <= 7; j = ++k) {
        ctx.fillStyle = b & Math.pow(2, j) ? "#ff0000" : "#00ff00";
        _x = x + (u * 8 + j) * CMC_SIZE;
        _y = y + v * CMC_SIZE;
        results1.push(ctx.fillRect(_x, _y, CMC_SIZE, CMC_SIZE));
      }
      return results1;
    })());
  }
  return results;
};

CanvasMatrixCode.decode = function(canvas, x, y, width, height) {
  var _x, _y, b, buff, c, col, ctx, end, j, k, l, m, ref, ref1, row, u, v;
  ctx = canvas.getContext('2d');
  col = Math.floor(width / (CMC_SIZE * 8));
  row = Math.floor(height / CMC_SIZE);
  u = v = c = 0;
  buff = [];
  end = false;
  for (v = k = 0, ref = row - 1; 0 <= ref ? k <= ref : k >= ref; v = 0 <= ref ? ++k : --k) {
    for (u = l = 0, ref1 = col - 1; 0 <= ref1 ? l <= ref1 : l >= ref1; u = 0 <= ref1 ? ++l : --l) {
      b = 0;
      for (j = m = 0; m <= 7; j = ++m) {
        _x = Math.floor(x + (u * 8 + j + .5) * CMC_SIZE);
        _y = Math.floor(y + (v + .5) * CMC_SIZE);
        c = ctx.getImageData(_x, _y, 1, 1).data;
        if (c[0] > 128) {
          b += Math.pow(2, j);
        } else if (c[1] < 128) {
          end = true;
          break;
        }
      }
      if (end) {
        break;
      }
      buff.push(b);
    }
    if (end) {
      break;
    }
  }
  str = CanvasMatrixCode.buffToStr(buff);
  return JSON.parse(str);
};

CanvasMatrixCode.buffToStr = function(buff) {
  return String.fromCharCode.apply(null, new Uint8Array(buff));
};

CanvasMatrixCode.strToBuff = function(str) {
  var buff, i, k, ref;
  buff = new Uint8Array(str.length);
  for (i = k = 0, ref = str.length - 1; 0 <= ref ? k <= ref : k >= ref; i = 0 <= ref ? ++k : --k) {
    buff[i] = str.charCodeAt(i);
  }
  console.log(buff);
  return buff;
};

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNhbnZhcy1tYXRyaXgtY29kZS5jb2ZmZWUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsSUFBQSxrREFBQTs7QUFBQSxRQUFBLEdBQVcsQ0FBWCxDQUFBOztBQUFBLGdCQUVBLEdBQW1CLEVBRm5CLENBQUE7O0FBQUEsR0FJQSxHQUFNLElBSk4sQ0FBQTs7QUFBQSxLQUtBLEdBQVEsSUFMUixDQUFBOztBQUFBLElBT0EsR0FDSTtBQUFBLEVBQUEsS0FBQSxFQUFPLGFBQVA7QUFBQSxFQUNBLEtBQUEsRUFBTyxTQURQO0NBUkosQ0FBQTs7QUFBQSxJQVdBLEdBQU8sSUFBSSxDQUFDLFNBQUwsQ0FBZ0IsSUFBaEIsQ0FYUCxDQUFBOztBQUFBLGdCQWFnQixDQUFDLElBQWpCLEdBQXdCLFNBQUMsTUFBRCxFQUFTLElBQVQsRUFBZSxDQUFmLEVBQWtCLENBQWxCLEVBQXFCLEtBQXJCLEVBQTRCLE1BQTVCLEdBQUE7QUFDcEIsTUFBQSw4REFBQTtBQUFBLEVBQUEsR0FBQSxHQUFNLE1BQU0sQ0FBQyxVQUFQLENBQWtCLElBQWxCLENBQU4sQ0FBQTtBQUFBLEVBQ0EsU0FBQSxHQUFZLGdCQUFnQixDQUFDLFNBQWpCLENBQTRCLElBQUksQ0FBQyxTQUFMLENBQWUsSUFBZixDQUE1QixDQURaLENBQUE7QUFBQSxFQUVBLElBQUEsR0FBVyxJQUFBLFVBQUEsQ0FBWSxTQUFaLENBRlgsQ0FBQTtBQUFBLEVBR0EsR0FBQSxHQUFNLElBQUksQ0FBQyxLQUFMLENBQVcsS0FBQSxHQUFRLENBQUMsUUFBQSxHQUFXLENBQVosQ0FBbkIsQ0FITixDQUFBO0FBQUEsRUFJQSxHQUFBLEdBQU0sSUFBSSxDQUFDLEtBQUwsQ0FBVyxNQUFBLEdBQVMsUUFBcEIsQ0FKTixDQUFBO0FBQUEsRUFLQSxDQUFBLEdBQUksQ0FBQSxHQUFJLENBTFIsQ0FBQTtBQUFBLEVBTUEsRUFBQSxHQUFLLEVBQUEsR0FBSyxDQU5WLENBQUE7QUFRQSxFQUFBLElBQUcsR0FBQSxHQUFNLEdBQU4s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QVRBO0FBQUEsRUF5QkEsR0FBQSxHQUFNLGdCQUFnQixDQUFDLFNBQWpCLENBQTRCLElBQTVCLENBekJOLENBQUE7QUEwQkEsU0FBTyxJQUFJLENBQUMsS0FBTCxDQUFZLEdBQVosQ0FBUCxDQTVCc0I7QUFBQSxDQW5DMUIsQ0FBQTs7QUFBQSxnQkFpRWdCLENBQUMsU0FBakIsR0FBOEIsU0FBQyxJQUFELEdBQUE7QUFDN0IsU0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLEtBQXBCLENBQTBCLElBQTFCLEVBQW9DLElBQUEsVUFBQSxDQUFXLElBQVgsQ0FBcEMsQ0FBUCxDQUQ2QjtBQUFBLENBakU5QixDQUFBOztBQUFBLGdCQW9FZ0IsQ0FBQyxTQUFqQixHQUE2QixTQUFDLEdBQUQsR0FBQTtBQUN6QixNQUFBLGVBQUE7QUFBQSxFQUFBLElBQUEsR0FBVyxJQUFBLFVBQUEsQ0FBVyxHQUFHLENBQUMsTUFBZixDQUFYLENBQUE7QUFDQSxPQUFTLHlGQUFULEdBQUE7QUFDSSxJQUFBLElBQUssQ0FBQSxDQUFBLENBQUwsR0FBVSxHQUFHLENBQUMsVUFBSixDQUFlLENBQWYsQ0FBVixDQURKO0FBQUEsR0FEQTtBQUFBLEVBR0EsT0FBTyxDQUFDLEdBQVIsQ0FBWSxJQUFaLENBSEEsQ0FBQTtBQUlBLFNBQU8sSUFBUCxDQUx5QjtBQUFBLENBcEU3QixDQUFBIiwiZmlsZSI6ImNhbnZhcy1tYXRyaXgtY29kZS5qcyIsInNvdXJjZVJvb3QiOiIvc291cmNlLyIsInNvdXJjZXNDb250ZW50IjpbIkNNQ19TSVpFID0gM1xuXG5DYW52YXNNYXRyaXhDb2RlID0ge31cblxuc3RyID0gbnVsbFxudWludDggPSBudWxsXG5cbmRhdGEgPVxuICAgIHRpdGxlOiBcIkhlbGxvIFdvcmxkXCJcbiAgICB2YWx1ZTogMTIzNDU2Nzg5XG5cbmpzb24gPSBKU09OLnN0cmluZ2lmeSggZGF0YSApXG5cbkNhbnZhc01hdHJpeENvZGUuZHJhdyA9IChjYW52YXMsIGRhdGEsIHgsIHksIHdpZHRoLCBoZWlnaHQpIC0+XG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcbiAgICBhcnJheUJ1ZmYgPSBDYW52YXNNYXRyaXhDb2RlLnN0clRvQnVmZiggSlNPTi5zdHJpbmdpZnkoZGF0YSkgKVxuICAgIGJ1ZmYgPSBuZXcgVWludDhBcnJheSggYXJyYXlCdWZmIClcbiAgICBjb2wgPSBNYXRoLmZsb29yKHdpZHRoIC8gKENNQ19TSVpFICogOCkpXG4gICAgcm93ID0gTWF0aC5mbG9vcihoZWlnaHQgLyBDTUNfU0laRSlcbiAgICB1ID0gdiA9IDBcbiAgICBfeCA9IF95ID0gMFxuXG4gICAgaWYgY29sICogcm93ICsgMSA8IGJ1ZmYubGVuZ3RoXG4gICAgICAgIGNvbnNvbGUubG9nIFwiW0NhbnZhc01hdHJpeENvZGVdIGRlc3RpbmF0aW9uIHJlY3QgaXMgdG9vIHNtYWxsIGZvciBkYXRhLlwiXG4gICAgICAgIHJldHVybiBudWxsXG5cbiAgICBmb3IgaSwgYiBvZiBidWZmXG4gICAgICAgIHUgPSAoaSAlIGNvbClcbiAgICAgICAgdiA9IE1hdGguZmxvb3IoaSAvIGNvbClcbiAgICAgICAgZm9yIGogaW4gWzAuLjddXG4gICAgICAgICAgICBjdHguZmlsbFN0eWxlID0gaWYgYiAmIE1hdGgucG93KDIsIGopIHRoZW4gXCIjZmYwMDAwXCIgZWxzZSBcIiMwMGZmMDBcIlxuICAgICAgICAgICAgX3ggPSB4ICsgKHUqOCArIGopICogQ01DX1NJWkVcbiAgICAgICAgICAgIF95ID0geSArIHYgKiBDTUNfU0laRSBcbiAgICAgICAgICAgIGN0eC5maWxsUmVjdChfeCwgX3ksIENNQ19TSVpFLCBDTUNfU0laRSlcblxuQ2FudmFzTWF0cml4Q29kZS5kZWNvZGUgPSAoY2FudmFzLCB4LCB5LCB3aWR0aCwgaGVpZ2h0KSAtPlxuXG4gICAgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJylcblxuICAgIGNvbCA9IE1hdGguZmxvb3Iod2lkdGggLyAoQ01DX1NJWkUgKiA4KSlcbiAgICByb3cgPSBNYXRoLmZsb29yKGhlaWdodCAvIENNQ19TSVpFKVxuICAgIHUgPSB2ID0gYyA9IDBcblxuICAgIGJ1ZmYgPSBbXVxuICAgIGVuZCA9IGZhbHNlXG5cbiAgICBmb3IgdiBpbiBbMC4ucm93LTFdXG4gICAgICAgIGZvciB1IGluIFswLi5jb2wtMV1cbiAgICAgICAgICAgIGIgPSAwXG4gICAgICAgICAgICBmb3IgaiBpbiBbMC4uN11cbiAgICAgICAgICAgICAgICBfeCA9IE1hdGguZmxvb3IoIHggKyAodSo4ICsgaiArIC41KSAqIENNQ19TSVpFIClcbiAgICAgICAgICAgICAgICBfeSA9IE1hdGguZmxvb3IoIHkgKyAodiArIC41KSAqIENNQ19TSVpFIClcbiAgICAgICAgICAgICAgICBjID0gY3R4LmdldEltYWdlRGF0YShfeCwgX3ksIDEsIDEpLmRhdGFcbiAgICAgICAgICAgICAgICBpZiBjWzBdID4gMTI4XG4gICAgICAgICAgICAgICAgICAgIGIgKz0gTWF0aC5wb3coMiwgailcbiAgICAgICAgICAgICAgICBlbHNlIGlmIGNbMV0gPCAxMjhcbiAgICAgICAgICAgICAgICAgICAgZW5kID0gdHJ1ZVxuICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgaWYgZW5kIHRoZW4gYnJlYWtcbiAgICAgICAgICAgIGJ1ZmYucHVzaCggYiApXG4gICAgICAgIGlmIGVuZCB0aGVuIGJyZWFrXG5cbiAgICBzdHIgPSBDYW52YXNNYXRyaXhDb2RlLmJ1ZmZUb1N0ciggYnVmZiApXG4gICAgcmV0dXJuIEpTT04ucGFyc2UoIHN0ciApXG5cbkNhbnZhc01hdHJpeENvZGUuYnVmZlRvU3RyID0gIChidWZmKSAtPlxuXHRyZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBuZXcgVWludDhBcnJheShidWZmKSlcblxuQ2FudmFzTWF0cml4Q29kZS5zdHJUb0J1ZmYgPSAoc3RyKSAtPlxuICAgIGJ1ZmYgPSBuZXcgVWludDhBcnJheShzdHIubGVuZ3RoKVxuICAgIGZvciBpIGluIFswLi5zdHIubGVuZ3RoLTFdXG4gICAgICAgIGJ1ZmZbaV0gPSBzdHIuY2hhckNvZGVBdChpKVxuICAgIGNvbnNvbGUubG9nIGJ1ZmZcbiAgICByZXR1cm4gYnVmZlxuXG5cbiMgYFxuIyBDYW52YXNNYXRyaXhDb2RlLmJ1ZmYyc3RyID0gZnVuY3Rpb24oYnVmKSB7XG4jICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkobnVsbCwgbmV3IFVpbnRBcnJheShidWYpKTtcbiMgfVxuIyBDYW52YXNNYXRyaXhDb2RlLnN0cjJidWZmID0gZnVuY3Rpb24oc3RyKSB7XG4jICAgdmFyIGJ1ZiA9IG5ldyBBcnJheUJ1ZmZlcihzdHIubGVuZ3RoKjIpOyAvLyAyIGJ5dGVzIGZvciBlYWNoIGNoYXJcbiMgICB2YXIgYnVmVmlldyA9IG5ldyBVaW50MTZBcnJheShidWYpO1xuIyAgIGZvciAodmFyIGk9MCwgc3RyTGVuPXN0ci5sZW5ndGg7IGkgPCBzdHJMZW47IGkrKykge1xuIyAgICAgYnVmVmlld1tpXSA9IHN0ci5jaGFyQ29kZUF0KGkpO1xuIyAgIH1cbiMgICByZXR1cm4gYnVmO1xuIyB9XG4jIGAiXX0=