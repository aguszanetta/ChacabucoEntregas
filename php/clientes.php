<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container top">
	<h2>Clientes</h2>
    <div class="btn-group">            
        <button id="btnNuevoCliente" type="button" class="btn btn-info" data-toggle="modal">
            <i class="material-icons">library_add</i>
        </button> 
    </div>
</div>    
<br>  

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaClientes" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idCliente</th>
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

<!--Modal para CRUD Clientes-->
<div class="modal fade" id="modalCRUD" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true" >
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header" id="modalForm">
                <h5 class="modal-title" id="titleForm"></h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
                </button>
            </div>
        <form id="formClientes">    
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Nombre</label>
                    <input type="text" class="form-control" id="nombre" required>
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">CUIT</label>
                    <input type="text" class="form-control" id="cuit">
                    </div> 
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Teléfono</label>
                    <input type="text" class="form-control" id="telefono">
                    </div>               
                    </div>    
                </div>
                <div class="row"> 
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Calle</label>
                    <input type="text" class="form-control" id="calle">
                    </div>               
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Numero</label>
                    <input type="text" class="form-control" id="numero">
                    </div>
                    </div>
                    <div class="col-lg-4">
                    <div class="form-group">
                    <label for="" class="col-form-label">Localidad</label>
                    <input type="text" class="form-control" id="localidad">
                    </select>
                    </div>               
                    </div>    
                </div>
                <div class="row">
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Mail</label>
                    <input type="email" class="form-control" id="mail">
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Usuario</label>
                    <input type="text" class="form-control" id="usuario" required>
                    </div>
                    </div> 
                </div>
                <div class="row">
                    <div id="form-pass" class="col-lg-6">
                    <div class="form-group">
                    <label id="labelPassword" for="" class="col-form-label">Contraseña</label>
                    <div class="input-group">
                    <input type="password" class="form-control border-right-0" id="password" >
                    <label for="" class="col-form-label"></label>
                    <button id="btn-password" type="button" class="btn btn-light btn-sm btn-password" data-toggle="modal">
                        <i id="eye"  class="material-icons eye">visibility</i>
                    </button>
                    </div>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Observaciones</label>
                    <input type="text" class="form-control" id="observaciones">
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
<div class="modal fade" id="modalPass" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
    <div class="modal-header bg-info" id="headerPass">
            <h5 class="modal-title" id="titlePass"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span>
        </div>
        <form id="formPass">
            <div class="modal-body">
                <div class="col-lg-12">
                <div class="form-group">
                <label for="" class="col-form-label">Ingrese Nueva Contraseña</label>
                <div class="input-group">
                <input type="password" class="form-control border-right-0" id="passwordR" >
                <label for="" class="col-form-label"></label>
                <button id="btn-passwordR" type="button" class="btn btn-light btn-sm btn-password" data-toggle="modal">
                    <i id="eyeR" class="material-icons">visibility</i>
                </button>
                </div>
                </div>
                </div> 
            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
            <button type="submit" id="btnGuardarR" class="btn btn-dark">Guardar</button>
            </div>
        </form>
    </div>
  </div>
</div>

<!----------------------------->

<?php require_once "dash_bottom.php" ?>