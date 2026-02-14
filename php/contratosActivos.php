<?php require_once "dash_top.php" ?>

<!---- Contenido Principal ---->
<div class="container top">
	<h2>Contratos Activos</h2>
    <div class="btn-group">            
        <button id="btnNuevoContratoA" type="button" class="btn btn-info" data-toggle="modal">
            <i class="material-icons">library_add</i>
        </button> 
    </div>
</div>    
<br>  

<div class="container">
    <div class="row">
        <div class="col-lg-12">
            <div class="table-responsive">        
                <table id="tablaContratosA" class="table table-striped table-bordered table-condensed" style="width:100%">
                    <thead class="text-center">
                        <tr>
                            <th>idContrato</th>
                        	<th>Número</th>
                            <th>Cliente</th>
                            <th>Cereal</th>
                            <th>Toneladas</th>
                            <th>Netos Sumados</th>
                            <th>Netos Finales Sumados</th>
                            <th>Comprador</th>
                            <th>Corredor</th>
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
        <form id="formContratos">    
            <div class="modal-body">
                <div class="row">
                    <div class="col-lg-6"> 
                    <div class="form-group">
                    <label for="">Cliente</label>
					<select id="cliente" required>
					</select>
                    </div>               
                    </div>
                    <div class="col-lg-6"> 
                    <div class="form-group">
                    <label for="">Cereal</label>
					<select id="cereal" required>
                        <option value="1">Maíz</option>
                        <option value="2">Trigo</option>
                        <option value="3">Soja</option>
					</select>
                    </div>               
                    </div>    
                </div> 
                <div class="row">
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Número</label>
                    <input type="text" class="form-control" id="numero" required>
                    </div>
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Toneladas</label>
                    <input type="number" class="form-control" id="toneladas">
                    </div> 
                    </div>    
                </div>
                <div class="row"> 
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Comprador</label>
                    <select id="comprador">
                        <option value="1">ARDION S.A.</option>
                        <option value="2">MOLINO CHACABUCO S.A.</option>
                        <option value="3">MOLINO F Y A BASILE S.A.</option>
                        <option value="4">MOLINOS CAÑUELAS S.A.</option>
                        <option value="5">NUTRIPET S.A.</option>
                        <option value="6">RODOLFO FERRARI E HIJO S.A.</option>
                        <option value="7">ACEITERA CHACABUCO S.A.</option>
                        <option value="8">VITALCAN S.A.</option>
                    </select>
                    </div>               
                    </div>
                    <div class="col-lg-6">
                    <div class="form-group">
                    <label for="" class="col-form-label">Corredor</label>
                    <select id="corredor" required>
					</select>
                    </div>
                    </div>    
                </div>			
            <div class="modal-footer">
                <button type="button" class="btn btn-light" data-dismiss="modal">Cancelar</button>
                <button type="submit" id="btnGuardar" class="btn btn-dark">Guardar</button>
            </div>           
            </div>
            
        </form>    
        </div>
    </div>
</div>
<!----------------------------->

<?php require_once "dash_bottom.php" ?>