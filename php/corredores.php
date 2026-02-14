<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container top">
	<h2>Corredores</h2>
    <div class="btn-group">            
        <button id="btnNuevoCorredor" type="button" class="btn btn-info" data-toggle="modal">
            <i class="material-icons">library_add</i>
        </button> 
    </div>
</div>    
<br>  

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaCorredores" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idCorredor</th>
                        	<th>Nombre</th>
                            <th>CUIT</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Localidad</th>
                            <th>Mail</th>
                            <th>Usuario</th>
                            <th>Observaciones</th>
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

<!--Modal para CRUD Corredores-->
<div class="modal fade" id="modalCRUDCorredor" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" id="modalForm">
                <h5 class="modal-title" id="titleForm"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formCorredores">    
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombreCorredor" required>
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">CUIT</label>
                    <input type="text" class="form-control" id="cuitCorredor">
                    </div> 
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Teléfono</label>
                    <input type="text" class="form-control" id="telefonoCorredor">
                    </div>               
                    </div>    
                </div>
                <div class="row"> 
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Calle</label>
                    <input type="text" class="form-control" id="calleCorredor">
                    </div>               
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Numero</label>
                    <input type="text" class="form-control" id="numeroCorredor">
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Localidad</label>
                    <input type="text" class="form-control" id="localidadCorredor">
                    </select>
                    </div>               
                    </div>    
                </div>
                <div class="row">
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Mail</label>
                    <input type="email" class="form-control" id="mailCorredor">
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Usuario</label>
                    <input type="text" class="form-control" id="usuarioCorredor" required>
                    </div>
                    </div> 
                </div>
                <div class="row">
                    <div id="form-passCorredor" class="col-lg-6">
                    <div class="form-group">
                    <label id="labelPasswordCorredor" for="" class="col-form-label">Contraseña</label>
                    <div class="input-group">
                    <input type="password" class="form-control border-right-0" id="passwordCorredor" >
                    <label for="" class="col-form-label"></label>
                    <button id="btn-passwordCorredor" type="button" class="btn btn-light btn-sm btn-password" data-toggle="modal">
                        <i id="eyeCorredor"  class="material-icons eye">visibility</i>
                    </button>
                    </div>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Observaciones</label>
                    <input type="text" class="form-control" id="observacionesCorredor">
                    </div>
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

<!-- Modal para restablecer contraseña -->
<div class="modal fade" id="modalPassCorredor" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerPassCorredor">
            <h5 class="modal-title" id="titlePassCorredor"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
        </div>
        <form id="formPassCorredor">
            <div class="modal-body">
                <div class="col-lg-12">
                <div class="form-group">
                <label for="" class="col-form-label">Ingrese Nueva Contraseña</label>
                <div class="input-group">
                <input type="password" class="form-control border-right-0" id="passwordRCorredor" >
                <label for="" class="col-form-label"></label>
                <button id="btn-passwordRCorredor" type="button" class="btn btn-light btn-sm btn-password" data-toggle="modal">
                    <i id="eyeRCorredor" class="material-icons">visibility</i>
                </button>
                </div>
                </div>
                </div> 
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
            <button type="submit" id="btnGuardarRCorredor" class="btn btn-dark">Guardar</button>
            </div>
        </form>
    </div>
  </div>
</div>

<!----------------------------->

<?php require_once "dash_bottom.php" ?>