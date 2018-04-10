(function (window, document) {
    "use strict";

    var isValidForm = true;

    var form = $("#form");
    var modal = $("#modalRegister");
    var name = $("#name");
    var email = $("#email");
    var date = $("#date");
    var tableList = $("#tableList");

    $("#date").mask("99/99/9999");
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
                name: "Mariana Caramico",
                email: "marianacaramico@hotmail.com",
                date: "26/08/1998"
            }
        ]
    });

    $.validator.addMethod("dateBR", function dateBR(value, element) {
        var regex = /^\d{2}\/\d{2}\/\d{4}$/;
        if(value.match(regex)) {
            var arrDate = value.split("/").map(value => {
                return Number.parseInt(value);
            });
            var date = new Date(arrDate[2], (arrDate[1] - 1), arrDate[0]);
            return (
                date && date < new Date()
                && date.getDate() === arrDate[0]
                && date.getMonth() === (arrDate[1] - 1)
                && date.getFullYear() === arrDate[2]
            );
        }
        return false;
    });

    form.validate({
        errorClass: 'text-danger',
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            },
            date: {
                required: true,
                dateBR: true
            }
        },
        messages: {
            name: {
                required: "Por favor, insira um nome"
            },
            email: {
                required: "Por favor, insira um endereço de e-mail",
                email: "O endereço de e-mail é inválido"
            },
            date: {
                required: "Por favor, insira uma data",
                dateBR: "A data inserida é inválida"
            }
        },
        invalidHandler: function(event, validator) {
            isValidForm = false;
        },
        submitHandler: function(form) {
            isValidForm = true;
        }
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
        var _thisModal = $("#modalRemove");
        _thisModal.find("#removeConfirm").off("click").on("click", function (event) {
            event.preventDefault();
            table.row($(e.currentTarget).closest("tr")).remove().draw();
            _thisModal.modal("hide");
        });
        _thisModal.modal("show");
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
            form.submit();
            if (isValidForm) {
                row.remove().draw();
            }
        });
    });

    function tableHandler() {
        if (isValidForm) {
            table.row.add({
                name: name.val(),
                email: email.val(),
                date: date.val()
            });
            modal.modal("hide");
        }
        return isValidForm;
    }
})(window, document)