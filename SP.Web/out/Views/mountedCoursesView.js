var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { createElement } from "tsx-create-element";
import { _ } from "../group";
import { Confirm } from "../confirm/confirm";
export class MountedCoursesView {
    constructor(_vm) {
        this._vm = _vm;
    }
    render(elementId) {
        var temp = (createElement("div", { class: "sp-box" },
            createElement("div", { class: "mc-row" },
                createElement("h1", null, "Mounted Courses"),
                createElement("div", { class: "mountcourses-form" },
                    createElement("div", { class: "sp-row-col-2-5", id: "lessFilters" },
                        createElement("select", { id: "academicYears", binding: "Object.academicYear" },
                            createElement("option", null, "Please Select Academic Year"),
                            this._vm.academicYears.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "programs", binding: "Object.program" },
                            createElement("option", null, "Please Select Program"),
                            this._vm.programs.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-primary btn-small", id: "submit" }, "Submit"),
                            createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "showFilters" }, "More"))),
                    createElement("div", { class: "sp-row-col-3", id: "moreFilters" },
                        createElement("select", { id: "enrollmentOption" }, this._vm.enrollmentOptions.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "category" }, this._vm.categories.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "semester" }, this._vm.semesters.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "level" }, this._vm.levels.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("select", { id: "isScoring" }, this._vm.scoring.map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("div", { class: "sp-btn-row" },
                            createElement("button", { class: "sp-btn sp-btn-default btn-small", id: "hideFilters" }, "Less"))),
                    createElement("div", null,
                        createElement("div", { class: "horizontal" },
                            createElement("table", { class: "table strech" },
                                createElement("thead", null,
                                    createElement("th", null, "EnrollmentOption"),
                                    createElement("th", null, "Course Code"),
                                    createElement("th", null, "Course"),
                                    createElement("th", null, "Credit"),
                                    createElement("th", null, "Level"),
                                    createElement("th", null, "Category"),
                                    createElement("th", null, "Scoring"),
                                    createElement("th", null, "AssignedTo"),
                                    createElement("th", null, "Action")),
                                createElement("tbody", { id: "courses", "data-repeat": "courses" },
                                    createElement("tr", null,
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null),
                                        createElement("td", null))))))))));
        let getCourses = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            yield this._vm.getMountedCourses();
        });
        let showFilters = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            document.getElementById("moreFilters").style.removeProperty("display");
            document.getElementById("lessFilters").style.display = "none";
        });
        let hideFilters = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            document.getElementById("moreFilters").style.display = "none";
            document.getElementById("lessFilters").style.removeProperty("display");
        });
        let buildQuery = (evt) => __awaiter(this, void 0, void 0, function* () {
            evt.preventDefault();
            let tr = document.getElementById("courses");
            tr.textContent = "";
            let row = (createElement("tr", null,
                createElement("td", { binding: "enrollmentOption" }),
                createElement("td", { binding: "courseCode" }),
                createElement("td", { binding: "courseName" }),
                createElement("td", { binding: "credit" }),
                createElement("td", { binding: "level" }),
                createElement("td", { binding: "category" }),
                createElement("td", null,
                    createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                        createElement("input", { type: "checkbox", binding: "scoring", disabled: "true" }),
                        createElement("span", { class: "checkmark" }))),
                createElement("td", { binding: "assignedTo" }),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small" }, "Del"))));
            tr.appendChild(row);
            let el = evt.target;
            this._vm.buidQuery(el.id, el.value);
        });
        const doc = document.getElementById(elementId);
        doc.textContent = "";
        doc.appendChild(temp);
        document.getElementById("moreFilters").style.display = "none";
        document.getElementById("submit").onclick = getCourses;
        document.getElementById("showFilters").onclick = showFilters;
        document.getElementById("hideFilters").onclick = hideFilters;
        document.getElementById("enrollmentOption").onchange = buildQuery;
        document.getElementById("category").onchange = buildQuery;
        document.getElementById("semester").onchange = buildQuery;
        document.getElementById("level").onchange = buildQuery;
        document.getElementById("isScoring").onchange = buildQuery;
        this._vm.bind();
    }
}
export class MountedRow {
    constructor(courses, _vm) {
        this.courses = courses;
        this._vm = _vm;
    }
    render() {
        let tr = document.getElementById("courses");
        tr.textContent = "";
        for (let c of this.courses) {
            let checkbox = c.scoring ? (createElement("input", { type: "checkbox", binding: "scoring", checked: c.scoring, value: c.scoring, disabled: "true" })) : (createElement("input", { type: "checkbox", binding: "scoring", value: c.scoring, disabled: "true" }));
            let row = (createElement("tr", null,
                createElement("td", { binding: "enrollmentOption" }, c.enrollmentOption),
                createElement("td", { binding: "courseCode" }, c.courseCode),
                createElement("td", { binding: "courseName" }, c.courseName),
                createElement("td", { binding: "credit" }, c.credit),
                createElement("td", { binding: "level" }, c.level),
                createElement("td", { binding: "category" }, c.category),
                createElement("td", null,
                    createElement("label", { class: "check-content", style: "margin-bottom: 0px;margin-top: 0px;padding-top: 0px;" },
                        checkbox,
                        createElement("span", { class: "checkmark" }))),
                createElement("td", { binding: "assignedTo" }, c.assignedTo),
                createElement("td", null,
                    createElement("button", { class: "sp-btn sp-btn-default btn-small" }, "Del"))));
            tr.appendChild(row);
            let deleteRow = row.getElementsByTagName("button")[0];
            deleteRow.addEventListener("click", (e) => {
                e.preventDefault();
                let options = {
                    title: "Confirm",
                    message: "Are you sure you want to delete ?",
                    okText: "Yes",
                    cancelText: "No",
                    onok: () => {
                        let row = e.target.parentElement.parentElement;
                        document.getElementById("courses").deleteRow(row.rowIndex);
                        //this._vm.removeCourse(row.rowIndex);
                    },
                };
                new Confirm(options).open();
            });
            let assignedTo = _.getElementByAttribute(row, "assignedTo");
            if (assignedTo) {
                assignedTo.addEventListener("click", (e) => {
                    e.preventDefault();
                    let originalValue = e.target.textContent;
                    let elem = e.target;
                    let tdAssignedTo = (createElement("p", { class: "assignedTo" },
                        createElement("select", { id: "lecturers", binding: "SelectedCourse.assignedTo" }, this._vm.getLecturers().map((x) => (createElement("option", { value: x.name }, x.name)))),
                        createElement("button", { class: "tr-btn-primary" },
                            createElement("li", { class: "fa fa-check" })),
                        createElement("button", { class: "tr-btn-default" },
                            createElement("li", { class: "fa fa-times" }))));
                    if (elem.tagName === "TD") {
                        elem.textContent = "";
                        elem.appendChild(tdAssignedTo);
                        let btns = tdAssignedTo.getElementsByTagName("button");
                        btns[0].addEventListener("click", (e) => {
                            e.preventDefault();
                            let newValue = e.target.parentElement.parentElement.getElementsByTagName("select")[0].value;
                            let row = e.target.parentElement.parentElement;
                            assignedTo.removeChild(row);
                            assignedTo.innerText = newValue;
                        });
                        btns[1].addEventListener("click", (e) => {
                            e.preventDefault();
                            let row = e.target.parentElement.parentElement;
                            assignedTo.removeChild(row);
                            assignedTo.innerText = originalValue;
                        });
                    }
                });
            }
        }
    }
}
//# sourceMappingURL=mountedCoursesView.js.map