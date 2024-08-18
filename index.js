document.addEventListener("DOMContentLoaded", () => {

    const peopleInLastShift = (day) => { // returns all people that are working during 19-20
        const tables = document.getElementsByClassName("vuorot");
        let body = tables[day].children[0];
        const lastRow = body.children[body.children.length - 1];

        let peopleInLastRow = [];
        for (let cell of lastRow.children) {
            if (cell.firstChild) {
                for (let child of cell.children) {
                    console.log(child.classList.contains("vuoroHasNote"))
                    if (child.classList.contains("vuoroHasNote")) {

                        let personId = child.classList.item(2).split("-")[2];
                        let personFullName = child.title.split("00")[2].split("\r")[0].slice(1);

                        let personData = {
                            username: child.innerHTML,
                            fullName: personFullName,
                            id: personId,
                            style: "position: relative",
                            shift: child.parentNode.classList.item(3).toString()
                        };

                        peopleInLastRow.push(personData);
                    }
                }
            }
        }
        return peopleInLastRow;
    };

    const newRow = (even, day, time, people) => { // create one row

        const row = document.createElement("tr");
        if (even) {
            row.classList.add("even");
        } 

        const rowHeader = document.createElement("th");
        rowHeader.style = "width: 7%;"
        rowHeader.classList.add("col1");
        rowHeader.innerHTML = time + "-" + (parseInt(time) + 1);

        row.appendChild(rowHeader);

        const cellData = [
            { class: "vv-tehtava-67" }, // Vuorovastaava
            { class: "vv-tehtava-90" }, // Taustavuoro / Aineistopyynnöt
            { class: "vv-tehtava-68" }, // Taustavuoro / Puhelin
            { class: "vv-tehtava-69" }, // Asiakaspalvelu - 3.krs
            { class: "vv-tehtava-55" }, // Puhelinpalvelu
            { class: "vv-tehtava-73" }, // Kokoelmatyöt Kaisa
            { class: "vv-tehtava-147" }, // Digiaspa
            { class: "vv-tehtava-78" }, // Kumpula
            { class: "vv-tehtava-143" }, // Terkko aspa
            { class: "vv-tehtava-140" }, // Viikki aspa
            { class: "vv-tehtava-157" }, // Etätöitä
            { class: "vv-tehtava-77" } // Poissa
        ];

        for (let i = 0; i < 12; i++) {
            let cell = document.createElement("td");
            cell.rowSpan = "1";
            cell.width = "7%";

            let classListItems = [
                cellData[i].class,
                "vv-viikonpaiva-" + day,
                "vv-kello-" + time,
                "vv-start-1723410000"
            ];

            for (let person of people) {
                if (person.shift == cellData[i].class) {
                    let p = document.createElement("p");
                    p.title = `${time}:00-${parseInt(time) + 1}:00 ${person.fullName}`;

                    p.classList.add("vv-henkilo-" + person.id);
                    p.classList.add("ui-corner-all");
                    p.classList.add("initials2");
                    p.classList.add("vuoroHasNote");


                    p.setAttribute("onclick", `highlightSelected(${person.id})`);

                    p.style = person.style;
                    p.innerHTML = person.username;
                    cell.appendChild(p);
                }
            }

            for (let item of classListItems) {
                cell.classList.add(item);
            }
            if (people.length > 0) cell.classList.add("newRows");

            row.appendChild(cell);
        }

        return row;
    };

    peopleInLastShift(0);

    const createTableRows = () => { // provide data and create all (2) rows
        const tables = document.getElementsByClassName("vuorot");
        for (let table of tables) {
            let body = table.children[0];
            const headerRow = body.children[0];
            const day = headerRow.children[1].innerHTML.split(" ")[0];

            let dayInt =
                day === "Maanantai" ? 0
                    : day === "Tiistai" ? 1
                        : day === "Keskiviikko" ? 2
                            : day === "Torstai" ? 3
                                : day === "Perjantai" ? 4
                                    : day === "Lauantai" ? 5
                                        : day === "Sunnuntai" ? 6
                                            : null;
            
            const people = peopleInLastShift(dayInt);


            body.appendChild(newRow(false, dayInt, "20", people));
            body.appendChild(newRow(true, dayInt, "21", people));
        }
    };

    // const credits = () => { // credits, but maybe I'll keep it commented out :)
    //     const footer = document.getElementById("footer");

    //     const creditsBox = document.createElement("div");
    //     creditsBox.style = "margin-top: 5vh; padding: 5px; border: 1px dotted black; display: inline-block;";
    //     creditsBox.id = "creditsBox";

    //     footer.appendChild(creditsBox);

    //     const creditsText = document.createElement("p");
    //     creditsText.innerHTML = "Huki-extension by Mikko Legezin";

    //     creditsBox.appendChild(creditsText);
    // };
    // credits();


    createTableRows();
});