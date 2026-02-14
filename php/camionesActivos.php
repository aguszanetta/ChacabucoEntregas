<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container top">
	<h2>Camiones Activos</h2>
    <div class="btn-group">            
        <button id="btnNuevoCamion" type="button" class="btn btn-info" data-toggle="modal">
            <i class="material-icons">library_add</i>
        </button> 
    </div>

    <div class="btn-group">            
        <button id="btnCamionMes" type="button" class="btn btn-success" data-toggle="modal">
            <i class="material-icons">task_alt</i>
        </button> 
    </div>
</div>    
<br> 

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaCamionesA" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idCamion</th>
                            <th>Contrato</th>
                            <th>Carta Porte</th>
                            <th>Peso Proc</th>
                            <th>Patente</th>
                            <th>Granel</th>
                            <th>Bruto</th>
                            <th>Tara</th>
                            <th>Neto</th>
                            <th>Hdad</th>
                            <th>Merma</th>
                            <th>Desc</th>
                            <th>Neto Final</th>
                            <th>Observaciones</th>
                            <th>Fecha</th>
                            <th>Acciones</th>                            
                        </tr>
                    </thead>
                    <tbody>                           
                    </tbody>        
                </table>               
            </div>
        </div>
    </div>  
</div>

<!-- Modal para borrar camiones por mes -->
<div class="modal fade" id="modalCamionMes" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerCamionMes">
                    <h5 class="modal-title" id="titleCamionMes"></h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </div>
                <form id="formMes">
                <div class="modal-body">
                    <div class="row">
                        <div class="col-10 offset-1 col-lg-8 offset-lg-2 div-wrapper d-flex justify-content-center align-items-center">
                            <div class="form-group">
                                <label for="" class="col-form-label">Ingrese Mes</label>
                                <input type="month" class="form-control" id="mes" required>
                            </div> 
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                    <button type="submit" id="btnArchivarCamionMes" class="btn btn-success">Archivar</button>
                </div>
            </form>
    </div>
  </div>
</div>

<!--Modal para CRUD Camiones-->
<div class="modal fade" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" id="modalForm">
                <h5 class="modal-title" id="titleForm"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formCamiones">
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Fecha</label>
                    <input type="date" class="form-control" id="fecha">
                    </div> 
                    </div>
                    <div class="col-lg-4"> 
                    <div class="form-group">
                    <label class="col-form-label">Contrato</label>
                    <select id="contrato" required>
                    </select>
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Carta Porte</label>
                    <input type="number" class="form-control" id="cartaPorte">
                    </div>
                    </div>                                  
                </div>
                <div class="row">
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Peso Proc</label>
                    <input type="number" step="0.001" class="form-control" id="pesoProc">
                    </div> 
                    </div>
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Patente</label>
                    <input type="text" class="form-control uppercase" id="patente">
                    </div>               
                    </div>
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Granel</label>
                    <input type="text" class="form-control" id="granel">
                    </div>
                    </div>
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Bruto</label>
                    <input type="number" step="0.001" class="form-control" id="bruto">
                    </div>
                    </div>   
                </div>
                <div class="row">
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Tara</label>
                    <input type="number" step="0.001" class="form-control" id="tara">
                    </div> 
                    </div>
                    <!--<div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Neto</label>
                    <input type="number" step="0.001" class="form-control" id="neto">
                    </div>               
                    </div>-->
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Humedad</label>
                    <input type="number" step="0.001" class="form-control" id="humedad">
                    </div>
                    </div>
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Merma</label>
                    <input type="number" step="0.001" class="form-control" id="merma" required>
                    </div>
                    </div>
                    <div class="col-lg-3">
                    <div class="form-group">
                    <label for="" class="col-form-label">Descuento</label>
                    <input type="number" step="0.001" class="form-control" id="descuento" required>
                    </div> 
                    </div>    
                </div>
                <div class="row"> 
                    <div class="col-lg-12">
                    <div class="form-group">
                    <label for="" class="col-form-label">Observaciones</label>
                    <input type="text" class="form-control" id="observaciones">
                    </div>               
                    </div>
                </div>
                <div class="row selecArchivo">  
                <div class="col-lg-10">      
                <div class="custom-file">
                    <input type="file" alt="" title="" name="archivos" class="custom-file-input" id="file">
                    <label id="archivosLabel" class="custom-file-label" for="customFile">Seleccione Archivo</label>
                </div>
                </div>
                <div class="col-lg-1 borrarArchivo"> 
                <button id="btnBorrarArchivo" type="button" class="btn btn-danger btn-sm" style="display:none;"><i class='material-icons'>delete</i></button>
                </div>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
            </div>
        </form>    
        </div>
    </div>
</div>

<!--Modal para Detalle Camion-->
<div class="modal fade" id="modalDetalleA" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerDetalleA">
                    <h5 class="modal-title" id="titleDetalleA">Detalle</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </div>
      <div class="modal-body">
        <div class="table-responsive">
            <table class="table table-hover table-bordered table-striped">
                <tbody>
                    <tr>
                        <th scope="row">Patente</th>
                        <td id="info00CamionA"></td>
                    </tr>
                    <tr>
                        <th scope="row">Granel</th>
                        <td id="info01CamionA"></td>
                    </tr>
                    <tr>
                        <th scope="row">Observaciones</th>
                        <td id="info02CamionA"></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-success" data-dismiss="modal">OK</button>
    </div>
    </div>
  </div>
</div>
<!----------------------------->

<?php require_once "dash_bottom.php" ?>