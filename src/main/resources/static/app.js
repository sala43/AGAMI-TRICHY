let grid;
let selectedId = null;
window.onload = function () {
    grid = new dhx.Grid("grid", {
        columns: [
            {
                id: "id",
                header: [{ text: "ID" }],
                width: 70
            },
            {
                id: "consignmentNo",
                header: [{ text: "Consignment No" }],
                width: 180
            },
            {
                id: "deliveryDate",
                header: [{ text: "Delivery Date" }],
                width: 150
            },
            {
                id: "palletNetwork",
                header: [{ text: "Pallet Network" }],
                width: 150
            },
            {
                id: "status",
                header: [{ text: "Status" }],
                width: 150
            }
        ]
    });
    loadData();
    grid.events.on("cellClick", function (row) {
        const rowData = grid.data.getItem(row.id);
        showDetails(rowData.id);
    });
};
function loadData() {
    fetch("/api/consignments")
        .then(response => response.json())
        .then(data => {
            grid.data.removeAll();
            grid.data.parse(data);
        })
        .catch(error => {
            console.error(error);
        });
}
function searchData() {
    const deliveryDate =
        document.getElementById("deliveryDate").value;
    const network =
        document.getElementById("network").value;
    if (!deliveryDate || !network) {
        alert("Please select Delivery Date and Network");
        return;
    }
    fetch(
        `/api/consignments/filter?deliveryDate=${deliveryDate}&network=${network}`
    )
        .then(response => response.json())
        .then(data => {
            grid.data.removeAll();
            grid.data.parse(data);
        })
        .catch(error => {
            console.error(error);
        });
}
function resetData() {
    document.getElementById("deliveryDate").value = "";
    document.getElementById("network").value = "";
    selectedId = null;
    document.getElementById("detailContent").innerHTML =
        "Select a row to view details";
    loadData();
}
function showDetails(id) {

    selectedId = id;
    fetch(`/api/consignments/${id}`)
        .then(response => response.json())
        .then(data => {
            let details = data.details;
            if (typeof details === "string") {
                details = JSON.parse(details);
            }
            let html = `
                <p><b>Customer Name:</b> ${details.customerName || ""}</p>
                <p><b>Customer Code:</b> ${details.customerCode || ""}</p>
                <p><b>Address:</b> ${details.address || ""}</p>
                <p><b>Contact No:</b> ${details.contactNo || ""}</p>
                <p><b>Email:</b> ${details.email || ""}</p>
            `;
            if (details.items && details.items.length > 0) {
                html += "<h4>Items</h4>";
                html += "<ul>";
                details.items.forEach(item => {
                    html += `
                        <li>
                            ${item.product}
                            (Qty: ${item.qty})
                        </li>
                    `;
                });
               html += "</ul>";
            }
            html += `
                <hr>
                <h4>Update Status</h4>
                <select id="status">
                    <option value="PENDING"
                        ${data.status === "PENDING" ? "selected" : ""}>
                        PENDING
                    </option>
                    <option value="PLANNED"
                        ${data.status === "PLANNED" ? "selected" : ""}>
                        PLANNED
                    </option>
                    <option value="IN_TRANSIT"
                        ${data.status === "IN_TRANSIT" ? "selected" : ""}>
                        IN_TRANSIT
                    </option>
                    <option value="DELIVERED"
                        ${data.status === "DELIVERED" ? "selected" : ""}>
                        DELIVERED
                    </option>
                </select>
                <button onclick="updateStatus()">
                    Update Status
                </button>
            `;
            document.getElementById("detailContent").innerHTML =
                html;
        })
        .catch(error => {
            console.error(error);
        });
}

function updateStatus() {
    if (!selectedId) {
        alert("Please select a row");
        return;
    }

    const status =
        document.getElementById("status").value;
    fetch(`/api/consignments/${selectedId}/status`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            status: status
        })
    })
        .then(response => response.json())
        .then(() => {
            alert("Status Updated Successfully");
            loadData();
            showDetails(selectedId);
        })
        .catch(error => {
            console.error(error);
            alert("Status Update Failed");
        });
}