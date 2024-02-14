package com.ssafy.ploud.domain.script;

import static com.querydsl.core.types.PathMetadataFactory.*;

import com.querydsl.core.types.dsl.*;

import com.querydsl.core.types.PathMetadata;
import javax.annotation.processing.Generated;
import com.querydsl.core.types.Path;


/**
 * QScriptEntity is a Querydsl query type for ScriptEntity
 */
@Generated("com.querydsl.codegen.DefaultEntitySerializer")
public class QScriptEntity extends EntityPathBase<ScriptEntity> {

    private static final long serialVersionUID = -1458147430L;

    public static final QScriptEntity scriptEntity = new QScriptEntity("scriptEntity");

    public final EnumPath<ScriptCategory> category = createEnum("category", ScriptCategory.class);

    public final StringPath content = createString("content");

    public final NumberPath<Integer> id = createNumber("id", Integer.class);

    public final StringPath originalVideo = createString("originalVideo");

    public final StringPath title = createString("title");

    public QScriptEntity(String variable) {
        super(ScriptEntity.class, forVariable(variable));
    }

    public QScriptEntity(Path<? extends ScriptEntity> path) {
        super(path.getType(), path.getMetadata());
    }

    public QScriptEntity(PathMetadata metadata) {
        super(ScriptEntity.class, metadata);
    }

}

