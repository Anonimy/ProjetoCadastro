(function (window, document) {
    "use strict";

    var form = $("#form");
    var modal = $("#modalRegister");
    var name = $("#name");
    var email = $("#email");
    var date = $("#date");
    var tableList = $("#tableList");

    $("#date").mask("00/00/0000");
    var table = tableList.DataTable({
        language: {
            emptyTable: "Nenhum registro encontrado",
            info: "Exibindo _START_ até _END_ de _TOTAL_ registros",
            infoEmpty: "Exibindo 0 registros",
            lengthMenu: "Exibir _MENU_ registros",
            infoFiltered: "(máximo de _MAX_ registros)",
            search: "Pesquisar:",
            paginate: {
                first: "Primeiro",
                last: "Último",
                next: "Próximo",
                previous: "Anterior"
            },
            zeroRecords: "Nenhum registro encontrado"
        },
        scrollX: true,
        scrollCollapse: true,
        columns: [
            {
                title: "Nome",
                data: "name",
            },
            {
                title: "Email",
                data: "email"
            },
            {
                title: "Data de Nascimento",
                data: "date"
            },
            {
                title: "",
                data: "actionButtons",
                orderable: false,
                width: "15%",
                defaultContent: "<button type='button' class='btn btn-sm btn-primary btnEdit'><i class='fas fa-pencil-alt'></i> Editar</button> <button type='button' class='btn btn-sm btn-danger btnRemove'><i class='fas fa-trash'></i> Remover</button>"
            }
        ],
        data: [
            {
                name: "Mateus Larrubia",
                email: "mateus.larrubia99@gmail.com",
                date: "30/04/1999"
            },
            {
                name: "Mateus Larrubia",
                email: "40015@alunos.bandtec.com.br",
                date: "30/04/1999"
            }
        ]
    });

    form.submit(function onSubmitHandler(e) {
        e.preventDefault();
        tableHandler();
        table.draw();
    });

    modal.on("hidden.bs.modal", function hiddenModalHandler(e) {
        var _this = $(e.currentTarget);
        _this.find("input").val("");
        _this.find("button[type='submit']").off("click");
    });

    tableList.on("click", ".btnRemove", function onRemoveHandler(e) {
        if (window.confirm("Deseja remover este cadastro?")) {
            table.row($(e.currentTarget).closest("tr")).remove().draw();
        }
    });

    tableList.on("click", ".btnEdit", function onEditHandler(e) {
        var row = table.row($(e.currentTarget).closest("tr"));
        var data = row.data();
        var button = form.find("button[type='submit']");
        name.val(data.name || "");
        email.val(data.email || "");
        date.val(data.date || "");
        modal.modal("show");
        button.click(function beforeSubmitHandler(e) {
            e.preventDefault();
            if (tableHandler()) {
                row.remove().draw();
            }
        });
    });

    function tableHandler() {
        if (validate()) {
            table.row.add({
                name: name.val(),
                email: email.val(),
                date: date.val()
            });
            modal.modal("hide");
            return true;
        }
        return false;
    }

    function validate() {
        // INSIRA A VALIDACAO AQUI
        return true;
    }
})(window, document);