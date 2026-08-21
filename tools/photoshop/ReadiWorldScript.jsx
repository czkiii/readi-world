#target photoshop

(function () {
    var dispatcher = new File($.fileName);
    var main = new File(dispatcher.parent.fsName + "/readi-asset-prep-jsx/Readi Asset Prep.jsx");
    var repoRoot = dispatcher.parent.parent.parent;
    var taskQueue = new File(repoRoot.fsName + "/art-source/_registry/photoshop-next-task.json");

    function readJson(file) {
        file.encoding = "UTF8";
        if (!file.open("r")) { throw new Error("Cannot open task queue: " + file.fsName); }
        var text = file.read();
        file.close();
        return eval("(" + text.replace(/^\uFEFF/, "") + ")");
    }

    function jsonString(value) {
        return "\"" + String(value)
            .replace(/\\/g, "\\\\")
            .replace(/\"/g, "\\\"")
            .replace(/\r/g, "\\r")
            .replace(/\n/g, "\\n") + "\"";
    }

    function stringifyFlatObject(data) {
        var lines = [];
        for (var key in data) {
            if (!data.hasOwnProperty(key)) { continue; }
            var value = data[key];
            var encoded;
            if (value === null) { encoded = "null"; }
            else if (typeof value === "number" || typeof value === "boolean") { encoded = String(value); }
            else { encoded = jsonString(value); }
            lines.push("  " + jsonString(key) + ": " + encoded);
        }
        return "{\n" + lines.join(",\n") + "\n}";
    }

    function writeJson(file, data) {
        file.encoding = "UTF8";
        if (!file.open("w")) { throw new Error("Cannot update task queue: " + file.fsName); }
        file.write(stringifyFlatObject(data));
        file.close();
    }

    if (taskQueue.exists) {
        var task = readJson(taskQueue);
        if (task.status === "READY") {
            var taskScript = new File(task.script);
            if (!taskScript.exists) {
                alert("Queued Readi task is missing:\n" + taskScript.fsName);
                return;
            }
            try {
                $.evalFile(taskScript);
                task.status = "COMPLETE";
                task.completedUtc = String(new Date());
                writeJson(taskQueue, task);
            } catch (taskError) {
                task.status = "FAILED";
                task.error = String(taskError);
                writeJson(taskQueue, task);
                alert("Readi queued task failed:\n" + taskError);
            }
            return;
        }
    }

    if (!main.exists) {
        alert("Readi Asset Prep is missing:\n" + main.fsName);
        return;
    }

    $.evalFile(main);
}());
